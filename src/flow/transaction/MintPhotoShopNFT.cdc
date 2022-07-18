import PhotoStore03 from 0xAdminAccount

transaction(metadata: {String: String}){

    let receiverRef: &PhotoStore03.NFTPhotoCollection

    prepare(acct: AuthAccount){

        //let newToken <- PhotoStore.createNFT()

        //PhotoStore.NFTCollection.deposit(token: newToken );
        //acct.save(<- PhotoStore.createNFT(), to: /storage/MyPhotoNFT2)
        self.receiverRef = acct.borrow<&PhotoStore03.NFTPhotoCollection>(from: PhotoStore03.CollectionStoragePath)
            ?? panic("Could not borrow receiver")
    }

    execute{

        let newToken <- PhotoStore03.createNFT(metadata: metadata)


        self.receiverRef.deposit(token: <- newToken );

    }
}