import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleUserRound } from "lucide-react";
import React from 'react';

type WalletCardProps = {
    type: string
    title: string,
    balance: number,
    currency?: string,
    onClick?: () => void;
};

const WalletCard: React.FC<WalletCardProps> = ({
    type,
    title,
    balance,
    currency = "₱",
    onClick
}) => {
    return (
        <Card className='rounded-x1 bg-white shadow-md cursor-pointer' onClick={onClick}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                <CircleUserRound size={40} color="#53b84c" strokeWidth={3} />
                <CardTitle className='text-base font-medium text-muted-foreground'>
                    {type}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-[12px] text-muted-foreground">{title}</p>
                <div className='text-2xl font-bold text-foreground'>
                    {currency} {balance.toLocaleString()}
                </div>
            </CardContent>
        </Card>
    )
}
 
export default WalletCard;