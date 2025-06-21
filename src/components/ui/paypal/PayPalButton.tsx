'use client';

import { paypalCheckPayment, setTransactionId } from '@/actions';
import { PayPalButtons, PayPalButtonsComponentProps, usePayPalScriptReducer } from '@paypal/react-paypal-js';

interface Props {
    orderId: string,
    amount: number,
}

export const PayPalButton = ({ orderId, amount }: Props) => {

    const [{ isPending }] = usePayPalScriptReducer();

    const rountedAmount = Math.round(amount * 100) / 100;

    if (isPending) {
        return (
            <div className="animate-pulse mb-6">
                <div className="h-12 bg-gray-300 rounded" />
                <div className="h-12 bg-gray-300 rounded mt-3" />
            </div>
        );
    };

    const createOrder: PayPalButtonsComponentProps['createOrder'] = async (data, actions) => {

        try {
            const transactionId = await actions.order.create({
                purchase_units: [
                    {
                        invoice_id: orderId,
                        amount: {
                            currency_code: 'USD',
                            value: `${rountedAmount}`
                        }
                    }
                ],
                intent: 'CAPTURE'
            });

            // Guardar el id en la orden de la DB
            const { ok } = await setTransactionId(transactionId, orderId);

            if (!ok) {
                throw new Error('No se pudo actualizar la orden');
            }

            return transactionId;

        } catch (error) {

            return '';
        }
    };

    const onApprove: PayPalButtonsComponentProps['onApprove'] = async (data, actions) => {

        const details = await actions.order?.capture();

        if (!details) return;

        await paypalCheckPayment(details.id!);
    };

    return (
        <div className="relative z-0">
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </div>
    );
};
