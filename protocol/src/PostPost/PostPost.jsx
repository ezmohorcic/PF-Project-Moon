import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAsync } from "../ReduxToolkit/apiCalls/categoriesCall.js";
import { postPost } from "../ReduxToolkit/apiCalls/postCall.js";
import { usePostImage } from "../hooks/usePostImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleUp,
  faAngleUp,
  faRocket,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import css from "./PostPost.module.css";

function validate(input) {
  let errors = {};

  if (!input.description) {
    errors.description = "Description cannot be empty.";
  }
  if (!input.categories) {
    errors.categories = "Categories cannot be empty.";
  }

  return errors;
}

export default function PostPost() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const {
    type: type1,
    value: image1,
    loading: loading1,
    onChange: onChange1,
    setNullFile
  } = usePostImage({ type: "file" });
  const user = useSelector((state) => state.user.currentUser);
  const categories = useSelector((state) => state.categories.posts.categories);
  const feed = useSelector((state) => state.feed);
  const [showCreate, setShowCreate] = useState(false);
  
  const [input, setInput] = useState({
    user: user?._id,
    images: [],
    title: "",
    description: "",
    price: "",
    categories: [],
    premium: false
  });

  useEffect(() => {
    image1 &&
      setInput({
        ...input,
        images: image1
      })
  }, [image1])


  useEffect(() => {
    getCategoriesAsync(dispatch);
  }, [dispatch]);


  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    console.log(e.target.value, input.categories)
    if (!input.categories.includes(e.target.value)) {
      setInput({ ...input, categories: [...input.categories, e.target.value] });
      setErrors(validate({ ...input, [e.target.name]: e.target.value }));
    }

  }

  function handleDeSelect(e) {
    e.preventDefault();

    setInput({ ...input, categories: input.categories.filter((element) => element != e.target.value) });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleChangePremium() {
    setInput({ ...input, premium: !input.premium })
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    postPost(dispatch, user._id, input, user.accessToken, feed);
    setNullFile();
    setInput({
      user: user._id,
      images: [],
      title: "",
      description: "",
      price: "",
      categories: [],
      premium: false
    });
    setShowCreate(false);
  }

  let CreateCss = showCreate ? css.openCreate : css.closeCreate;

  const showWidth = document.documentElement.clientWidth<1025;
  let showBut="";
  if(!showWidth)
  {
    showBut=(<button onClick={() => setShowCreate(!showCreate)} id={css.CreateButShow}>
      {" "}
      <FontAwesomeIcon id={css.rocketUp} icon={faRocket} />
      <FontAwesomeIcon id={css.AngleUpUp} icon={faAngleUp} />
      <FontAwesomeIcon id={css.chevronUp} icon={faChevronCircleUp} />
      <FontAwesomeIcon id={css.AngleUpDown} icon={faAngleUp} />
    </button>)
  }
  else
  {
    showBut=<button id={css.slimBut} onClick={() => setShowCreate(!showCreate)}><FontAwesomeIcon id={css.rocketUp} icon={faRocket} /></button>
  }

  return (
    <div id={css.createCont}>
      {showBut}

      <form id={CreateCss} onSubmit={(e) => handleSubmit(e)}>
        <div id={css.innerCreateCont}>
          {/* <div><button onClick={(e) => upImage(e)}>UPLOAD IMAGE</button></div> */}
          <div className={css.infoCont}>
            <input className={css.labelInputTitle} onChange={(e) => handleChange(e)} placeholder="Title" type="text" name="title" value={input.title} />
            {errors.title && (<span className={css.labelSpan}><small>{errors.title}</small></span>)}
          </div>

          <div className={css.infoCont}>
            <textarea className={css.labelInputDescription} onChange={(e) => handleChange(e)} placeholder="Description" type="text" name="description" value={input.description} />
            {errors.description && (<span className={css.labelSpan}> <small>{errors.description}</small></span>)}
          </div>

          <div id={css.imgUpCont}>
            <div id={css.imgUpHidden}>
              {input?.images && loading1 ? (
                <img src="https://acegif.com/wp-content/uploads/loading-25.gif" id={css.imgUploaded} />) : (
                image1.map((e) => {
                  return (<div><img src={e} id={css.imgUploaded} /></div>)
                })
              )}
            </div>

            <div className={css.labelImgUpload}>Upload Images</div>
            <input className={css.labelInputImg} type={type1} id="file1" multiple onChange={onChange1} />
          </div>

          {image1.length !== 0 && (
            <div className={css.infoCont}>
              <input className={css.labelInputTitle} onChange={(e) => handleChange(e)} placeholder="Price USD" type="number" name="price" value={input.price} />
              <div id={css.premiumChoice}>
                <p id={css.premiumTitle}>Premium post?</p>
                <div id={input.premium ? css.SliderShellOn : css.SliderShellOff} onClick={handleChangePremium}>
                  <div id={input.premium ? css.sliderOn : css.sliderOff}></div>
                </div>
              </div>
            </div>
          )}

          <div className={css.infoContCat}>

            <select className={css.labelInputCat} id="categories" name="categories" onChange={(e) => handleSelect(e)} required>
              <option value="categories"> Choose the categories </option>
              {categories?.map((c, i) => (<option key={"category_option_" + i} className={css.optionCat} value={c}> {c} </option>))}
            </select>

            <div className={css.selectedCont}>
              {input.categories.map((element, index) => (<button onClick={(e) => handleDeSelect(e)} className={css.categorySelected} key={"selected_cat_" + index} value={element}>{element} <FontAwesomeIcon icon={faTimes} /> </button>))}
            </div>

          </div>

          <button id={css.submitButPost} type="submit">
            Launch!
          </button>

        </div>
      </form>
    </div>
  );
}
