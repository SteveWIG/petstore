import PhotoStore from 0x02b34629baf16c99

transaction{

    prepare(acct: AuthAccount){
        acct.save(<- PhotoStore.createNFT(), to: /storage/MyPhotoNFT2)
    }

    execute{
        log("Stored an NFT")
    }
}