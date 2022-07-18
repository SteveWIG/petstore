import PhotoStore03 from 0xAdminAccount

pub fun main():[UInt64]{

    let adminAccount = getAccount(0xAdminAccount)

    let capability =  adminAccount.getCapability<&{PhotoStore03.NFTReceiver}>(PhotoStore03.CollectionPublicPath)
    
    let receiverRef = capability.borrow()
        ?? panic("What is wrong with this?")

    return receiverRef.getTokenIds()

}