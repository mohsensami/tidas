-- CreateTable
CREATE TABLE "public"."Favorite" (
    "userId" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorites_userId_productId_pk" PRIMARY KEY ("userId","productId")
);

-- AddForeignKey
ALTER TABLE "public"."Favorite" ADD CONSTRAINT "favorites_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Favorite" ADD CONSTRAINT "favorites_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
