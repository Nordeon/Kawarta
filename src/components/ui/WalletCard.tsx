import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from 'react';

type WalletCardProps = {
    title: string,
    balance: number,
    currency?: string,
    onClick?: () => void;
};

const WalletCard: React.FC<WalletCardProps> = ({
    title,
    balance,
    currency = "₱",
    onClick
}) => {
    return (
        <Card className='rounded-x1 p-4 bg-white shadow-md cursor-pointer' onClick={onClick}>
            <CardHeader>
                <CardTitle className='text-sm font-medium text-muted-foreground'>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                
            </CardContent>
            <div className='text-x1 font-bold'>
                {currency} {balance.toLocaleString()}
            </div>
        </Card>
    )
}
 
export default WalletCard;