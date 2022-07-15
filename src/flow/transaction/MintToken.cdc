// MintToken.cdc

// Import the `PetStore` contract instance from the master account address.
// This is a fixed address for used with the testNet only.
import PetStore from 0x02b34629baf16c99

transaction(metadata: {String: String}) {

    let receiverRef: &PetStore.NFTNoInterfaceCollection?

    let minterRef: &PetStore.NFTMinter?

    //let myMetaData:{String:String}

    // `prepare` block always take one or more `AuthAccount` parameter(s) to indicate
    // who are signing the transaction.
    // It takes the account info of the user trying to execute the transaction and
    // validate. In this case, the contract owner's account.
    // Here we try to "borrow" the capabilities available on `NFTMinter` and `NFTReceiver`
    // resources, and will fail if the user executing this transaction does not have access
    // to these resources.
    prepare(account: AuthAccount) {
        
        self.minterRef = account.borrow<&PetStore.NFTMinter>(from: /storage/NFTMinter)

        self.receiverRef = account.borrow<&PetStore.NFTNoInterfaceCollection>(from: /storage/NFTNoInterfaceCollection)
            //?? panic("Could not borrow receiver reference")
        
        // With an authorized reference, we can just `borrow()` it.
        // Note that `NFTMinter` is borrowed from `/storage` domain namespace, which
        // means it is only accessible to this account.
        
        //self.minterRef = account.borrow<&PetStore.NFTMinter>(from: /storage/NFTMinter)
        //    ?? panic("Could not borrow minter reference")

    }

    // `execute` block executes after the `prepare` block is signed and validated.
    execute {
        // Mint the token by calling `mint(metadata: {String: String})` on `@NFTMinter` resource, which returns an `@NFT` resource, and move it to a variable `newToken`.
        
        let newToken <- self.minterRef.mint(metadata)
        
        // Call `deposit(token: @NFT)` on the `@NFTReceiver` resource to deposit the token.
        // Note that this is where the metadata can be changed before transferring.
        self.receiverRef.deposit(<- newToken)
        //PetStore.NFTCollection.deposit(token: <-newToken)

    }
}