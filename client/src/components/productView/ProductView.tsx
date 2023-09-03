import { FC, useMemo, useState } from "react";
import { useOlxContext } from "../../context/useOlxContext";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useParams } from "react-router-dom";


export const ProductView: FC = () => {
    const {id} = useParams();
  const { products } = useOlxContext();
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  const currProductDetails = useMemo(() => {
    return products.find((product) => product.productId === +id!);
  }, [id]);


  const changeSelectedImgIdx = (change: 1 | -1) => {
    if(selectedImgIdx === 0 && change === -1) return;
    setSelectedImgIdx(prev => {
        return (prev + change) % (currProductDetails!.productImgs.length)
    });
  }

  return (
    <div>
      <div className="flex justify-center flex-col w-full px-6 md:px-16 py:3 md:py-8 w-max-[1228px]">
        <div className="relative h-80 w-full bg-black">
            <ChevronLeft className="text-white absolute top-[50%]" onClick={() => changeSelectedImgIdx(-1)} fontSize="large"/>
          <img
            className="w-full h-full object-contain"
            src={`http://localhost:3000/${currProductDetails?.productImgs[selectedImgIdx]}`}
            alt=""
          />
          <ChevronRight className="text-white absolute right-0 top-[50%]" onClick={()=> changeSelectedImgIdx(1)} fontSize="large"/>
        </div>
        <div className="px-5 py2 flex justify-center gap-6 mt-16">
          <div className="px-16 py-12 flex-1 shadow-md">
            <h2 className="font-semibold text-4xl mb-5">
              {currProductDetails?.productname}
            </h2>
            <span className="font-semibold text-lg">Description</span>
            <p className="leading-8">{currProductDetails?.productdesc}</p>
            <span className="font-semibold text-lg">Owner Details</span>
            <p>
              Name: <span className="font-semibold">{currProductDetails?.owner.username}</span>
            </p>
            <p>
              Email: <span className="font-semibold">{currProductDetails?.owner.useremail}</span>
            </p>
          </div>
          <div className="px-8 py-12 flex flex-col gap-2 shadow-lg border border-slate-600 border-opacity-30 rounded-md">
            <h2 className="font-semibold text-4xl">
              {currProductDetails?.productPrice}
            </h2>
            <button className="bg-slate-800 text-white text-xl font-normal px-16 py-4 rounded-md shadow-lg">
              Make offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
