export const getTrimmedAddress = (address: string) => 
    `${address.slice(0,6)}...${address.slice(-4)}`;

export const getStatus = (status: number) => {
    switch (status) {
        case 1:
            return "Created";
        case 2:
            return "Matched";
        case 3:
            return "Settled";
        case 4:
            return "Order SoftFailed";
        case 5:
            return "Order HardFailed";
        case 6:
            return "Order Cancelled";
        default:
            return "";
    }
}