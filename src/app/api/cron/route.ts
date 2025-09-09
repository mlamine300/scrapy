import { findAllProduct, updateProduct } from "@/app/lib/db/mongoose";
import { generateEmailBody, sendEmail } from "@/app/lib/nodemailer";
import { scrapeUrl } from "@/app/lib/scrapLib";
import { getEmailNotifType } from "@/app/lib/utils";
import { Product } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const maxDuration = 300;
export async function GET() {
  try {
    const allProduct = (await findAllProduct({})) as unknown as Product[];
    //console.log(allProduct);
    if (!allProduct) return Response.json({ message: "there is no product!!" });
    const updatesProduct = await Promise.all(
      allProduct.map(async (product) => {
        const updatedProduct = await scrapeUrl(product.url);
        if (!updatedProduct) return product;
        const newProduct = await updateProduct({
          ...updatedProduct,
          users: product.users,
        });

        const notif = getEmailNotifType(updatedProduct, product);
        const receivers = product.users.map((u) => u.email);
        if (notif && receivers && receivers.length > 0) {
          const emailContent = await generateEmailBody(newProduct, notif);
          const infoEmail = await sendEmail(emailContent, receivers);
        }
        //console.log(infoEmail);
        return newProduct;
      })
    );
    return Response.json("success");
  } catch (error) {
    return Response.json("error : " + error);
    throw error;
  }

  //return Response.json({ message: "Hello World" });
}
