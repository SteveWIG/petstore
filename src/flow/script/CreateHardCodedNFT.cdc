import transaction from "src/flow/transaction/MintToken.cdc"

pub fun createHardCodedNft(){

        
    return transaction({"Name":"Butch","Breed":"Labrador"})

}