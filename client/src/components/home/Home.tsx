import { FC, useEffect } from "react";
import { gwagon, loadingGif } from "../../assets";
import { FavoriteBorder } from "@mui/icons-material";
import { ProductInterface, useOlxContext } from "../../context/useOlxContext";
import { useNavigate } from "react-router-dom";

interface ItemProps {
  name: string;
  img: string;
  price: string;
  id: number;
}

const Item: FC<ItemProps> = ({ name, img, price, id }) => {
  
  const IndFormat = new Intl.NumberFormat('en-IN');
  const navigate = useNavigate();


  const productClickHandler = () => {
    navigate(`/${id}`);
  };

  return (
    <div
      onClick={productClickHandler}
      className="flex flex-col shadow-sm border-slate-200 rounded-sm border max-h-[260px] max-w-[220px] relative"
    >
      <div className="rounded-full absolute right-2 top-2 bg-white p-2">
        <FavoriteBorder fontSize="small" />
      </div>
      <div className="h-2/3 w-[210px]">
        <img
          className="w-full h-full object-cover"
          src={`http://localhost:3000/${img}`}
          alt=""
        />
      </div>
      <div className="h-1/3 border-l-4 border-orange-300 p-3">
        <h4 className="font-semibold">
        &#8377; <span>{IndFormat.format(+price)}</span>
        </h4>
        <p>{name}</p>
      </div>
    </div>
  );
};

export const Home: FC = () => {
  const { products, setProducts, loading, setLoading } = useOlxContext();


  async function fetchData() {
    setLoading(true);
    const res = await fetch("http://localhost:3000/product/getallproducts", {
      method: "GET",
    });
    if (res.ok) {
      const data: ProductInterface[] = await res.json();
      setProducts(data);
      setLoading(false);
    } else console.error("error when fetch product data");
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>{
      loading ? 
      <div className="flex justify-center items-center w-screen h-screen">
        <img className="" src={loadingGif} alt="" />
      </div>
      :

      <div className="flex justify-center mx-6 md:mx-16 py-4 md:py-8">
        <div className="w-full max-w-[1228px] flex justify-start gap-4 flex-wrap">
          {products.map((product) => (
            <Item
              name={product.productname}
              img={product.productImgs[0]}
              price={product.productPrice}
              id={product.productId}
            />
          ))}
          {products.map((product) => (
            <Item
              name={product.productname}
              img={product.productImgs[0]}
              price={product.productPrice}
              id={product.productId}
            />
          ))}
          {products.map((product) => (
            <Item
              name={product.productname}
              img={product.productImgs[0]}
              price={product.productPrice}
              id={product.productId}
            />
          ))}
          {products.map((product) => (
            <Item
              name={product.productname}
              img={product.productImgs[0]}
              price={product.productPrice}
              id={product.productId}
            />
          ))}
        </div>
      </div>
    }

    </>
  );
};
