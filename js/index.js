const createListTrailers = (parrent, srcList) => {
  const trailersList = document.createElement("ul");
  trailersList.classList.add("trailers__list");
  parrent.append(trailersList);

  const trailerWrappers = [];
  const trailerFrames = [];

  srcList.forEach((src) => {
    const trailersItem = document.createElement("li");
    trailersItem.classList.add("trailers__item");
    trailersList.append(trailersItem);

    const trailersWrapper = document.createElement("div");
    trailersWrapper.classList.add("trailers__wrapper");
    trailersItem.append(trailersWrapper);
    trailerWrappers.push(trailersWrapper);

    const trailersVideo = document.createElement("iframe");
    trailersVideo.classList.add("trailers__video");
    trailersVideo.dataset.src = src;
    trailersWrapper.append(trailersVideo);
    trailerFrames.push(trailersVideo);

    const idVideo = src.match(/\/embed\/([^/\?]+)/)[1];
    trailersVideo.srcdoc = `
    <style>
    *{
        padding: 0;
        margin: 0;
        overflow: hidden;
    }
    
    html, body {
        width: 100%;
        height: 100%;
    }
    
    img, svg {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        height: 100%;
    }
    
    #button{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate( -50%, -50% );
        z-index: 5;
        width: 64px;
        height: 64px;
        border: none;
        background-color: transparent;
        cursor: pointer;
    }
    
    @media(max-width: 900px) {
        #button{
            width: 36px;
            height: 36px;
           
    }}
    </style>
    <a href="https://www.youtube.com/embed/${idVideo}?autoplay=1">
      <img src="https://img.youtube.com/vi/${idVideo}/maxresdefault.jpg">
      <div id="button">
      <svg width="64.000000" height="64.000000" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	
	<defs/>
	<circle id="Ellipse 2" cx="32.000000" cy="32.000000" r="32.000000" fill="#FF3D00" fill-opacity="1.000000"/>
	<path id="Polygon 1" d="M42.5 31.134L27.5 22.4737C26.8334 22.0888 26 22.5699 26 23.3397L26 40.6603C26 41.4301 26.8334 41.9112 27.5 41.5263L42.5 32.866C43.1666 32.4811 43.1666 31.5189 42.5 31.134Z" fill="#FFFFFF" fill-opacity="1.000000" fill-rule="evenodd"/>
</svg>

      </div>
    </a>
    `;
  });

  return { trailerWrappers, trailerFrames };
};

const controlTrailer = (trailerWrappers, trailerFrames, i = 0, j = 0) => {
  if (i !== j) {
    trailerWrappers[i].style.display = "none";
    trailerFrames[i].src = "";
  } else {
    trailerWrappers[i].style.display = "block";
    trailerFrames[i].src = trailerFrames[i].dataset.src;
  }
};

const init = () => {
  const trailersContainer = document.querySelector(".trailers__container");
  const trailersButton = document.querySelectorAll(".trailers__button");

  const srcList = [];
  trailersButton.forEach((btn) => {
    srcList.push(btn.dataset.src);
  });

  const { trailerWrappers, trailerFrames } = createListTrailers(
    trailersContainer,
    srcList
  );
  trailersButton.forEach((btn, j) => {
    btn.addEventListener("click", () => {
      trailersButton.forEach((tBtns, i) => {
        if (tBtns === btn) {
          tBtns.classList.add("trailers__button_active");
        } else {
          tBtns.classList.remove("trailers__button_active");
        }
        controlTrailer(trailerWrappers, trailerFrames, i, j);
      });
    });
  });
  controlTrailer(trailerWrappers, trailerFrames);
};

init();
