pub contract PhotoStore{

    pub var totalSupply: UInt64

    pub resource NFT{
        pub let id: UInt64

        init(){
            self.id = PhotoStore.totalSupply
            PhotoStore.totalSupply = PhotoStore.totalSupply + (1 as UInt64)
        }
    }

    pub fun createNFT(): @NFT {
        return <- create NFT()
    }

    init(){
        self.totalSupply = 0
    }


}