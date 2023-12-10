import {useEffect} from "react";


const sliderImages = new Array(5).fill(0);

const HeroSlider = () => {
    // Hero slider
    useEffect(() => {
        const fn_cs_slider = document.querySelectorAll(".fn_cs_slider");
        fn_cs_slider.forEach((element) => {
            let sliderTop = element.getElementsByClassName("slider_top")[0],
                sliderBottom = element.getElementsByClassName("slider_content"),
                activeIndex = 2,
                speed = 6000;

            let myInterval = setInterval(function () {
                activeIndex++;
                activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
            }, speed);
            const prev = document.querySelector(".slider_nav .prev"),
                next = document.querySelector(".slider_nav .next"),
                li = element.getElementsByTagName("li");
            prev.addEventListener("click", function (e) {
                e.preventDefault();
                clearInterval(myInterval);
                activeIndex--;
                activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
                myInterval = setInterval(function () {
                    activeIndex++;
                    activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
                }, speed);
                return false;
            });
            next.addEventListener("click", (e) => {
                e.preventDefault();
                clearInterval(myInterval);
                activeIndex++;
                activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
                myInterval = setInterval(function () {
                    activeIndex--;
                    activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
                }, speed);
                return false;
            });
            for (let i = 0; i < li.length; i++) {
                const liElement = li[i];
                const getClass = liElement.getAttribute("class");
                if (getClass === "next") {
                    activeIndex++;
                } else if (getClass === "prev") {
                    activeIndex--;
                } else {
                    return false;
                }
                clearInterval(myInterval);
                activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
                myInterval = setInterval(function () {
                    activeIndex++;
                    activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
                }, speed);
                return false;
            }
        });
    }, []);

    const sliderDo = (sliderTop, sliderBottom, activeIndex) => {
        var topLength = sliderTop.getElementsByTagName("li").length;
        if (activeIndex > topLength) {
            activeIndex -= topLength;
        }
        var indexPrev = activeIndex - 1;
        var indexPrev2 = activeIndex - 2;
        var indexNext = activeIndex + 1;
        var indexNext2 = activeIndex + 2;
        if (indexPrev > topLength) {
            indexPrev -= topLength;
        }
        if (indexPrev2 > topLength) {
            indexPrev2 -= topLength;
        }
        if (indexNext > topLength) {
            indexNext -= topLength;
        }
        if (indexNext2 > topLength) {
            indexNext2 -= topLength;
        }
        if (indexPrev < 1) {
            indexPrev += topLength;
        }
        if (indexPrev2 < 1) {
            indexPrev2 += topLength;
        }
        if (activeIndex < 1) {
            activeIndex += topLength;
        }
        if (indexNext < 1) {
            indexNext += topLength;
        }
        if (indexNext2 < 1) {
            indexNext2 += topLength;
        }
        let li = sliderTop.getElementsByTagName("li");
        for (let i = 0; i < li.length; i++) {
            const element = li[i];
            element.classList.remove("prev", "prev2", "active", "next", "next2");
            // element.setAttribute(`data-index${indexNext}`);
        }
        sliderTop
            .querySelector('li[data-index="' + indexPrev2 + '"]')
            .classList.add("prev2");
        sliderTop
            .querySelector('li[data-index="' + indexPrev + '"]')
            .classList.add("prev");
        sliderTop
            .querySelector('li[data-index="' + activeIndex + '"]')
            .classList.add("active");
        sliderTop
            .querySelector('li[data-index="' + indexNext + '"]')
            .classList.add("next");
        sliderTop
            .querySelector('li[data-index="' + indexNext2 + '"]')
            .classList.add("next2");
        return activeIndex;
    };

    return (
        <section id="home">
            <div className="container">
                <h3
                    className="fn__maintitle big"
                    data-text="Meta Legends"
                    data-align="center"
                >
                    Meta Legends
                </h3>
                {/* Slider */}
                <div className="fn_cs_slider" data-responsive="on">
                    <div className="slider_top">
                        <img src="/img/1x1.jpg" alt=""/>
                        <ul>
                            {sliderImages.map((i, k) => (
                                <li className="prev" data-index={k + 1} key={k}>
                                    <div className="item">
                                        <img src="/img/1x1.jpg" alt=""/>
                                        <div className="item_in">
                                            <div className="img" data-bg-img={`/img/slider/${k + 1}.webp`}/>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="slider_nav">
                        <a href="#" className="prev">
                            <span className="circle"/>
                            <span className="icon">
                <img src="/svg/down.svg" alt="" className="fn__svg"/>
              </span>
                            <span className="circle"/>
                        </a>
                        <a href="#" className="next">
                            <span className="circle"/>
                            <span className="icon">
                <img src="/svg/down.svg" alt="" className="fn__svg"/>
              </span>
                            <span className="circle"/>
                        </a>
                    </div>
                </div>
                {/* !Slider */}
                {/* Description */}
                <div className="fn_cs_desc">
                    <p>

                        What is Shit Pet?
                        A revolutionary collection of 10,000 adorable NFT characters that will make you laugh out loud!
                        Our NFT collection is not just about cute and charismatic characters, it's a movement.
                        <br/>
                        We are dedicated to bringing together socially responsible individuals and like-minded people
                        from all over the world to form a strong and supportive community. Our multi-layered and viral
                        concept is designed to capture the attention of a wide audience, making it accessible to anyone
                        who shares our values and beliefs. We understand that some people may be hesitant to associate
                        themselves with such a defiant content topic. However, we believe that humor is a powerful tool
                        to convey important social messages. On the contrary, many influencers who tend to follow viral
                        events, supporting our collection can be a profitable informational opportunity for them.
                    </p>
                    <a
                        href="https://opensea.io/"
                        className="metaportal_fn_button"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <span>Buy On Opensea</span>
                    </a>
                </div>
                {/* !Description */}
            </div>
        </section>
    );
};
export default HeroSlider;
