import { Footer, Sidebar, TopMenu } from '@/components';

interface Props {
    children: React.ReactNode
};

export default function ShopLayout({ children }: Props) {
    return (
        <main className="flex relative flex-col justify-between min-h-screen">
            <TopMenu />
            <Sidebar />

            <div className="w-full mt-[117px] flex-1">
                {children}
            </div>

            <Footer />
        </main>
    );
}