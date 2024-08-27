const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const frames = {
  currentIndex: 0,
  maxIndex: 1345,
};

let imagesLoaded = 0;
const images = [];

function preloadImages() {
  for (let i = 1; i <= frames.maxIndex; i++) {
    const imageUrl = `./frames2/frame_${i.toString().padStart(4, "0")}.jpeg`;
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      imagesLoaded++;
      if (imagesLoaded === frames.maxIndex) {
        loadImage(frames.currentIndex);
        startAnimation();
      }
    };
    images.push(img);
  }
}

function loadImage(index) {
  if (index >= 0 && index <= frames.maxIndex) {
    const img = images[index];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;
    const scale = Math.max(scaleX, scaleY);

    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    const offsetX = (canvas.width - newWidth) / 2;
    const offsetY = (canvas.height - newHeight) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

    frames.currentIndex = index;
  }
}

function startAnimation() {

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".parent",
      start: "top top",
      end: "bottom bottom",
      scrub: 2,
    },
  });

  function updteFrame(index) {
    return {
      currentIndex: index,
      ease: "lienar",
      onUpdate: function () {
        loadImage(Math.floor(frames.currentIndex));
      },
    };
  }

  tl.to(frames, updteFrame(100), "first")
    .to(".animate1", { opacity: 0, ease: "lienar" }, "first")

    .to(frames, updteFrame(160), "second")
    .to(".animate2", { opacity: 1, ease: "lienar" }, "second")

    .to(frames, updteFrame(220), "third")
    .to(".animate2", { opacity: 1, ease: "lienar" }, "third")

    .to(frames, updteFrame(280), "four")
    .to(".animate2", { opacity: 0, ease: "lienar" }, "four")

    .to(frames, updteFrame(340), "five")
    .to(".animate3", { opacity: 1, ease: "lienar" }, "five")

    .to(frames, updteFrame(400), "six")
    .to(".animate3", { opacity: 1, ease: "lienar" }, "six")

    .to(frames, updteFrame(460), "seven")
    .to(".animate3", { opacity: 0, ease: "lienar" }, "seven")

    .to(frames, updteFrame(520), "eight")
    .to(".panel", { x: "0%", ease: "expo" }, "eight")

    .to(frames, updteFrame(580), "nine")
    .to(".panel", { x: "0%", ease: "expo" }, "nine")

    .to(frames, updteFrame(640), "ten")
    .to(".panel", { opacity: 0, ease: "lienar" }, "ten")

    .to(frames, updteFrame(700), "eleven")
    .to("canvas", { scale: 0.5, ease: "lienar" }, "eleven")

    .to(frames, updteFrame(760), "twelve")
    .to(".panelism", { opacity: 1, ease: "expo" }, "twelve")

    .to(frames, updteFrame(820), "twelve")
    .to(".panelism span", { width: 200, ease: "expo" }, "twelve")

    .to(frames, updteFrame(880), "thirteen")
    .to("canvas", { scale: 1, ease: "lienar" }, "thirteen")

    .to(frames, updteFrame(960), "fourteen")
    .to(".panelism", { scale: 2, ease: "circle" }, "fourteen")

    .to(frames, updteFrame(1344), "fifteen")
    .to(".panelism", { scale: 2, ease: "circle" }, "fifteen");
}

const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

window.addEventListener("resize", function () {
  loadImage(Math.floor(this.frames.currentIndex));
});

document.querySelectorAll(".headings h3").forEach(function (elem) {
  gsap.from(elem, {
    scrollTrigger: {
      trigger: elem,
      start: "top 90%",
      end: "bottom 20%",
      scrub: 2,
    },
    opacity: 0.3,
  });
});

preloadImages();


