import { Navbar } from "flowbite-react";
import Image from "next/image";
import search from "./icons/search.svg";
import cart from "./icons/cart.svg";
import { useRouter } from "next/router";

const Navigation = () => {
  const router = useRouter();
  const logout = () => {
    localStorage.clear();
    router.push("/signIn");
  };
  return (
    <div className="top-0 w-full">
      <Navbar fluid={true}>
        <Navbar.Brand>
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            ECOMMERCE
          </span>
        </Navbar.Brand>
        <Navbar.Collapse>
          <Navbar.Link href="/">Categories</Navbar.Link>
          <Navbar.Link href="/about">Sale</Navbar.Link>
          <Navbar.Link href="/about">Clearance</Navbar.Link>
          <Navbar.Link href="/about">New stock</Navbar.Link>
          <Navbar.Link href="/about">Trending</Navbar.Link>
        </Navbar.Collapse>
        <div>
          <div onClick={logout}>logout</div>
          <div className="flex md:order-2">
            <Image
              priority
              src={search}
              height={19.5}
              width={19.5}
              alt="search"
            />
            <Image priority src={cart} height={19.5} width={19.5} alt="cart" />
          </div>
        </div>
      </Navbar>
      <div className="bg-gray-200 h-9 flex items-center justify-center">
        {"< Get 10% off on business sign up >"}
      </div>
    </div>
  );
};

export default Navigation;
