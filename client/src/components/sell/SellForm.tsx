import { AddAPhoto } from "@mui/icons-material";
import { ChangeEvent, FC, FormEvent, useEffect, useRef } from "react";
import { useOlxContext } from "../../context/useOlxContext";
import { useNavigate } from "react-router-dom";

export const SellForm: FC = () => {
  const fileInp = useRef<HTMLInputElement>(null);
  const navigator = useNavigate();

  const { product_imgs, removeProductImg, addProductImg, setLoginToggleHandler, user } = useOlxContext();

  const addProductImgHandler = () => {
    fileInp.current!.click();
  };

  const fileInpChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.currentTarget.files !== null) {
        addProductImg(e.currentTarget.files[0]);
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    for(const product_img of product_imgs) {
        formData.append('product_img', product_img);
    }
    const currForm = e.currentTarget;
    const res = await fetch('http://localhost:3000/product/add', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
    })

    if(res.ok) {
      alert("Product added successfully");
      currForm.reset();
    }
    else console.log("veendum moonji");
  }

  useEffect(() => {
    if(!user) {
      navigator('/');
      setLoginToggleHandler();
    }
  }, [])

  return (
    <div className="bg-black w-full h-screen bg-opacity-90 flex justify-center">
      <form onSubmit={submitHandler}>
        <div className="flex flex-wrap flex-col md:flex-row px-4 md:px-6 py-3 md:py-16 max-w-[1280px] gap-5">
          <div className="flex flex-col flex-1">
            <label
              className="font-semibold text-white mb-2"
              htmlFor="product_name"
            >
              Product Name
            </label>
            <input
              className="px-4 py-2 rounded-md bg-gray-800 text-white"
              type="text"
              name="product_name"
              id="product_name"
              placeholder="Product Name"
            />
          </div>
          <div className="flex flex-col md:w-[50%]">
            <label
              className="font-semibold text-white mb-2"
              htmlFor="product_price"
            >
              Product Price
            </label>
            <input
              className="px-4 py-2 rounded-md bg-gray-800 text-white"
              type="number"
              name="product_price"
              id="product_price"
              placeholder="Product price"
            />
          </div>
          <div className="flex flex-col md:w-[50%]">
            <label
              className="font-semibold text-white mb-2"
              htmlFor="product_desc"
            >
              Product Description
            </label>
            <textarea
              className="bg-gray-800 rounded-md text-white"
              name="product_desc"
              id="product_desc"
              cols={30}
              rows={10}
            ></textarea>
          </div>

          <div className="flex flex-col flex-1">
            <label
              className="font-semibold text-white mb-2"
              htmlFor="product_name"
            >
              Select Photos
            </label>
            <input
              ref={fileInp}
              className="hidden px-4 py-2 rounded-md bg-gray-800 text-white"
              type="file"
              onChange={(e) => fileInpChangeHandler(e)}
            />
            <div className="flex gap-3">
              <div className="relative p-2 border-slate-400 border-4 w-28 h-28">
                {product_imgs[0] ? (
                  <>
                    <img className="w-full h-full object-cover" src={URL.createObjectURL(product_imgs[0])} alt="" />
                    <button
                      type="button"
                      onClick={() => removeProductImg(0)}
                      className="absolute text-xl right-2 text-white top-0"
                    >
                      X
                    </button>
                  </>
                ) : (
                  <AddAPhoto
                    onClick={addProductImgHandler}
                    className="text-white"
                    fontSize="large"
                  />
                )}
              </div>
              <div
                className="relative p-2 border-slate-400 border-4 h-28 w-28"
              >
                {product_imgs[1] ? (
                  <>
                    <img className="w-full h-full object-cover" src={URL.createObjectURL(product_imgs[1])} alt="" />
                    <button
                      type="button"
                      onClick={() => removeProductImg(1)}
                      className="absolute right-2 top-0 text-xl text-white"
                    >
                      X
                    </button>
                  </>
                ) : (
                  <AddAPhoto 
                  onClick={addProductImgHandler}
                  className="text-white" fontSize="large" />
                )}
              </div>
              <div
                className="relative p-2 border-slate-400 border-4 h-28 w-28"
              >
                {product_imgs[2] ? (
                  <>
                    <img className="w-full h-full object-cover"  src={URL.createObjectURL(product_imgs[2])} alt="" />
                    <button
                      type="button"
                      onClick={() => removeProductImg(2)}
                      className="absolute top-0 text-xl text-white right-2"
                    >
                      X
                    </button>
                  </>
                ) : (
                  <AddAPhoto 
                  onClick={addProductImgHandler}
                  className="text-white" fontSize="large" />
                )}
              </div>
              <div
                className="relative p-2 border-slate-400 border-4 h-28 w-28"
              >
                {product_imgs[3] ? (
                  <>
                    <img className="w-full h-full object-cover"  src={URL.createObjectURL(product_imgs[0])} alt="" />
                    <button
                      type="button"
                      onClick={() => removeProductImg(3)}
                      className="absolute top-0 text-xl text-white"
                    >
                      X
                    </button>
                  </>
                ) : (
                  <AddAPhoto 
                  onClick={addProductImgHandler}
                  className="text-white" fontSize="large" />
                )}
              </div>
              <div
                className="relative p-2 border-slate-400 border-4 h-28 w-28"
              >
                {product_imgs[4] ? (
                  <>
                    <img className="w-full h-full object-cover"  src={URL.createObjectURL(product_imgs[0])} alt="" />
                    <button
                      type="button"
                      onClick={() => removeProductImg(4)}
                      className="absolute top-0 text-xl text-white"
                    >
                      X
                    </button>
                  </>
                ) : (
                  <AddAPhoto 
                  onClick={addProductImgHandler}
                  className="text-white" fontSize="large" />
                )}
              </div>
            </div>
          </div>
        </div>
          <button className="text-white border-2 border-white rounded-md px-4 py-2 font-semibold">Sell product</button>
      </form>
    </div>
  );
};
