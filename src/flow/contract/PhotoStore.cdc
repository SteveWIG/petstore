pub contract PhotoStore{

    pub var totalSupply: UInt64

    pub resource NFT{

        pub let id: UInt64

        pub var metadata: {String: String}

        init(metadata: {String: String}){
            self.id = PhotoStore.totalSupply
            self.metadata = metadata
            PhotoStore.totalSupply = PhotoStore.totalSupply + (1 as UInt64)
        }
    }

    pub resource interface NFTReceiver {

        // Can withdraw a token by its ID and returns 
        // the token.
        pub fun withdraw(id: UInt64): @NFT

        // Can deposit an NFT to this NFTReceiver.
        pub fun deposit(token: @NFT)

        // Can fetch all NFT IDs belonging to this 
        // NFTReceiver.
        pub fun getTokenIds(): [UInt64]

        // Can fetch the metadata of an NFT instance 
        // by its ID.
        pub fun getTokenMetadata(id: UInt64) : {String: String}

        // Can update the metadata of an NFT.
        //pub fun updateTokenMetadata(id: UInt64, metadata: {String: String})

    }

    pub resource NFTCollection:NFTReceiver  {

        // Keeps track of NFTs this collection.
        access(account) var ownedNFTs: @{UInt64: NFT}

        // Constructor
        init() {
            self.ownedNFTs <- {}
        }

        // Destructor
        destroy() {
            destroy self.ownedNFTs
        }

        // Withdraws and return an NFT token.
        pub fun withdraw(id: UInt64): @NFT {
            let token <- self.ownedNFTs.remove(key: id)
            return <- token!
        }

        // Deposits a token to this NFTCollection instance.
        pub fun deposit(token: @NFT) {
            self.ownedNFTs[token.id] <-! token
        }

        // Returns an array of the IDs that are in this collection.
        pub fun getTokenIds(): [UInt64] {
            return self.ownedNFTs.keys
        }

        // Returns the metadata of an NFT based on the ID.
        pub fun getTokenMetadata(id: UInt64): {String : String} {
            let metadata = self.ownedNFTs[id]?.metadata
            return metadata!
        }

        // Updates the metadata of an NFT based on the ID.
        //pub fun updateTokenMetadata(id: UInt64, metadata: {String: String}) {
        //    for key in metadata.keys {
                // Can't set the metadata here - need to call a method in the NFT class
                // Where the data is mutable
                //self.ownedNFTs[id]?.metadata?.insert(key: key,  metadata[key]!)
        //    }
        //}

    }

    pub fun createNFT(metadata: {String: String}): @NFT {
        return <- create NFT(metadata: {String: String})
    }

    init(){
        self.totalSupply = 0
        self.account.save(<-create NFTCollection(), to: /storage/NFTCollection)
    }


}