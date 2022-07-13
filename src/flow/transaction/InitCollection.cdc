// InitCollection.cdc

import PetStore from 0xf8d6e0586b0a20c7

// This will be signed by any user account who wants to receive tokens.
transaction {

    //let factoryRef: &{PetStore.NFTFactoryInterface}
    
    prepare(account: AuthAccount) {
        // Create a new empty collection for this account
        //let collection <- PetStore.NFTCollection.new()

        //self.account.save(<-create NFTCollection(), to: /storage/NFTCollection)

        // store the empty collection in this account storage.

        //let publicAccount = getAccount(0xf8d6e0586b0a20c7)
    
        //self.factoryRef = publicAccount.getCapability<&{PetStore.NFTFactoryInterface}>(/public/NFTFactoryInterface)
            //.borrow()
            //?? panic("Could not borrow factory reference")

        let NFTCollection <- PetStore.createNFTCollection()

        account.save<@PetStore.NFTCollection>(<- NFTCollection, to: /storage/NFTCollection)

        // Link a public capability for the collection.
        // This is so that the sending account can deposit the token to this account's
        // collection by calling its `deposit(token: @NFT)` method.
        account.link<&{PetStore.NFTReceiver}>(/public/NFTReceiver, target: /storage/NFTCollection)
    }
}