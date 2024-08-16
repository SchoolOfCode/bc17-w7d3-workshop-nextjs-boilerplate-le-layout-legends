import "./globals.css";
import { Aleo } from "next/font/google";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const font = Aleo({ subsets: ["latin"] });

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={font.className}>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
