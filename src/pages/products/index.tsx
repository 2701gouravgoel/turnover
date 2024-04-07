import type { NextPage } from "next";
import Navigation from "../../components/Navigation";
import { useRouter } from "next/router";
import { trpc } from "../_app";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  checkIn: boolean;
}
const Products: NextPage = ({}) => {
  const [page, setPage] = useState(0);
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const updateMutation = trpc.product.checkInProduct.useMutation({
    async onSuccess() {
      alert("interest updated");
    },
    async onError() {
      if (updateMutation.error?.data?.zodError) {
        const fieldErrors = updateMutation.error.data.zodError.fieldErrors;
        alert(fieldErrors);
      }
    },
  });
  const productsQuery = trpc.product.getProducts.useQuery({ page });
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        !localStorage.getItem("currentUser") ||
        !localStorage.getItem("otpVerified")
      )
        router.push("/");
    }
  }, [typeof window]);
  const getData = () => {
    const { data = [] } = productsQuery || {};
    setProducts(data);
  };
  useEffect(() => {
    getData();
  }, [productsQuery]);

  const updateList = (id: number) => {
    updateMutation.mutate({ id, userId: 123 });
  };
  return (
    <div className="flex flex-col items-center page">
      <Navigation />
      <div className="flex flex-col border border-solid border-gray-300 br-20 px-15 py-10 items-center modal mt-10">
        <div className="mb-8">
          <span className="font-semibold text-black fs-32">
            Please mark your interests!
          </span>
        </div>
        <div className="text-black text-sm mb-8">
          We will keep you notified.
        </div>
        <div className="flex flex-col self-start">
          <div className="mb-7 font-medium fs-20">My saved interests!</div>
          {products?.map(({ title, checkIn, id }) => {
            return (
              <div className="flex mb-6" onClick={() => updateList(id)}>
                {checkIn ? (
                  <div className="checkbox checkIn ">
                    <span className="text-white">{"✔"}</span>
                  </div>
                ) : (
                  <div className="checkbox" />
                )}
                <span className="ml-3">{title}</span>
              </div>
            );
          })}
          <div className="flex row items-center space-x-3 pagination cursor-pointer">
            <div onClick={() => setPage(0)} className="text-sm">
              {"<<"}
            </div>
            <div>{"    "}</div>
            <div
              onClick={() => setPage(Math.max(0, page - 1))}
              className="text-sm"
            >
              {"<"}
            </div>
            {Array.from(
              { length: 7 },
              (_, index) => index + Math.max(page - 3, 0)
            ).map((val) => {
              return (
                <>
                  {val === page ? (
                    <div className=" text-sm text-black">{val + 1}</div>
                  ) : (
                    <div onClick={() => setPage(val)} className="text-sm">
                      {val + 1}
                    </div>
                  )}
                </>
              );
            })}

            <div onClick={() => setPage(page + 1)} className=" text-sm">
              {">"}
            </div>
            <div>{"    "}</div>
            <div onClick={() => setPage(15)} className=" text-sm">
              {">>"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Products;
