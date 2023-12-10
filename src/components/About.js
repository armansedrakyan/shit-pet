import Link from "next/link";

const About = () => {
    return (
        <section id="about">
            {/* About Shortcode */}
            <div className="fn_cs_about">
                <div className="left_part">
                    <div className="img">
                        <div className="img_in" data-bg-img="/img/about/1.webp">
                            <img src="/img/1x1.jpg" alt=""/>
                        </div>
                    </div>
                    <div className="bg_overlay">
                        <div className="bg_image" data-bg-img="/img/about/bg.webp"/>
                    </div>
                </div>
                <div className="right_part">
                    <div className="right_in">
                        <h3 className="fn__maintitle" data-text="Why we created Shit Pet?">
                            Why we created Shit Pet?
                        </h3>
                        <div className="fn_cs_divider">
                            <div className="divider">
                                <span/>
                                <span/>
                            </div>
                        </div>
                        <div className="desc">
                            <p>
                                Shit Pet is born after two years of crafting successful designs for our esteemed clients
                                and gaining invaluable experience in the NFT market. We have now reached a pivotal
                                moment, where we are thrilled to share our unique vision and creativity with the world.
                                "Shit Pet" is not just a piece of shit, but a masterpiece that showcases our passion for
                                design and dedication to excellence. We believe that Shit Pet is a culminating idea in
                                our modern society. Our collection is a revolutionary concept that has all the chances
                                to take the modern world by storm. Get ready to be inspired by our unique blend of crazy
                                artistry innovation, and philosophy!
                            </p>

                            <h3 className="fn__maintitle" data-text="Why will people buy shit pets?">
                                Why will people buy shit pets?
                            </h3>

                            <p>
                                Our NFT collection satirizes the chaos of the modern world, inviting everyone to join us
                                in poking fun at the "shit" that surrounds us and taming it. But it's not just a joke -
                                it's a call to action. By owning a piece of our collection, you become part of a
                                movement to fix the situation and create a better future. We offer a unique opportunity
                                for people to engage with contemporary issues in a lighthearted and humorous way. And
                                that's not all - our plans include creating an innovative philosophical game, similar to
                                the beloved classic "Journey" (2012), In this game, you will embark on a thrilling
                                journey of self-discovery and purification with Shit Pet character.

                            </p>

                            <p>
                                Our research indicates that "Shit Pet" NFT collection has the potential to appeal to a
                                wide range of individuals, particularly those in countries such as Japan and South
                                Korea, where toilet humor is highly developed. In fact, Japan even has a museum
                                dedicated to poop!

                            </p>

                            <p>
                                In addition to the cultural significance of toilet humor in Japan and South Korea, our
                                NFT
                                collection also taps into the growing trend of "kawaii" or cute culture. This trend has
                                gained popularity not only in Asia but also globally, with companies such as Sanrio
                                (creator
                                of Hello Kitty) and Line Friends (popular messaging app characters) achieving massive
                                success.

                            </p>

                        </div>
                        {/*<a*/}
                        {/*    href="https://discord.com/"*/}
                        {/*    className="metaportal_fn_button"*/}
                        {/*    target="_blank"*/}
                        {/*    rel="noreferrer"*/}
                        {/*>*/}
                        {/*    <span>Find us On Discord</span>*/}
                        {/*</a>*/}
                    </div>
                </div>
            </div>
            {/* !About Shortcode */}
            <div className="container">
                {/* Mint Shortcode */}
                <div className="fn_cs_mint">
                    <div className="left_part">
                        <h3 className="fn__maintitle" data-text="Our mission">
                            Our mission
                        </h3>
                        <div className="fn_cs_divider">
                            <div className="divider">
                                <span/>
                                <span/>
                            </div>
                        </div>
                        <div className="desc">
                            <p>

                                Revolutionizing the NFT market, our mission is to transform our unique collection into a
                                powerful social responsibility trend. Our NFTs are more than just digital art; they are
                                a statement that combines trendiness and humor with an important social mission. Our
                                collection is not just poking fun at pop culture; our goal is to raise awareness among
                                people about global issues such as hunger, poverty, climate change, and other pressing
                                concerns that affect our planet. Through our NFT collection, we aim to inspire people to
                                take action and make a positive impact on the world
                            </p>

                        </div>
                        <Link href="/nft-single">
                            <a className="metaportal_fn_button">
                                <span>How to Mint</span>
                            </a>
                        </Link>
                    </div>
                    <div className="right_part">
                        {/* Steps Shortcode */}
                        <div className="fn_cs_steps">
                            <ul>
                                <li>
                                    <div className="item">
                                        <div className="item_in">
                                            <h3 className="fn__gradient_title">01</h3>
                                            <p>Connect your Wallet</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="item">
                                        <div className="item_in">
                                            <h3 className="fn__gradient_title">02</h3>
                                            <p>Select Your Quantity</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="item">
                                        <div className="item_in">
                                            <h3 className="fn__gradient_title">03</h3>
                                            <p>Confirm The Transaction</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="item">
                                        <div className="item_in">
                                            <h3 className="fn__gradient_title">04</h3>
                                            <p>Receive Your NFT’s</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/* !Steps Shortcode */}
                        {/* Video Shortcode */}
                        <div className="fn_cs_video">
                            <img src="/img/video/1.jpg" alt=""/>
                            <a
                                className="popup-youtube"
                                href="https://www.youtube.com/embed/7e90gBu4pas"
                            >
                                <img src="/svg/play.svg" alt="" className="fn__svg"/>
                            </a>
                        </div>
                        {/* /Video Shortcode */}
                    </div>
                </div>
                {/* !Mint Shortcode */}
            </div>
        </section>
    );
};
export default About;

export const About2 = () => (
    <section id="about2">
        <div className="container small">
            <div className="fn_cs_shortabout">
                <div className="about_left">
                    <h3 className="fn__maintitle" data-text="The Rise of Legends">
                        The Rise of Legends
                    </h3>
                    <div className="fn_cs_divider">
                        <div className="divider">
                            <span/>
                            <span/>
                        </div>
                    </div>
                    <div className="desc">
                        <p>
                            As the first hero of the Meta Legends, collection has over 9,999
                            unique skins drawn from the different missions and challenges he
                            faced throughout his life.
                        </p>
                        <p>
                            The artwork has been hand-drawned by Robert Green in the
                            traditional anime style and composited by Layla Efiyo.
                        </p>
                    </div>
                    <a
                        href="https://discord.com/"
                        className="metaportal_fn_button"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <span>Find us On Discord</span>
                    </a>
                </div>
                <div className="about_right">
                    <div className="abs_img" data-bg-img="/img/about/2.jpg"/>
                </div>
            </div>
            <div className="fn_cs_collection_info">
                <h3 className="fn__gradient_title">10,000</h3>
                <h3
                    className="fn__maintitle upper"
                    data-text="Total Items in Collection"
                >
                    Total Items in Collection
                </h3>
                <p>
                    There are many variations of passages of lorem ipsum available, but
                    the majority have suffered alteration in some form, by injected
                    humour, or randomised words which {`don't`} look even slightly
                    believable.
                </p>
            </div>
        </div>
        <div className="fn_cs_video bg">
            <div className="abs_img" data-bg-img="/img/video/1.jpg"/>
            <a
                className="popup-youtube"
                href="https://www.youtube.com/embed/7e90gBu4pas"
            >
                <img src="/svg/play.svg" alt="" className="fn__svg"/>
            </a>
        </div>
        <div className="container">
            {/* Steps Shortcode */}
            <div className="fn_cs_steps gap" data-cols={4} data-gap={60}>
                <ul>
                    <li>
                        <div className="item">
                            <div className="item_in">
                                <h3 className="fn__gradient_title">01</h3>
                                <p>Connect your Wallet</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="item">
                            <div className="item_in">
                                <h3 className="fn__gradient_title">02</h3>
                                <p>Select Your Quantity</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="item">
                            <div className="item_in">
                                <h3 className="fn__gradient_title">03</h3>
                                <p>Confirm The Transaction</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="item">
                            <div className="item_in">
                                <h3 className="fn__gradient_title">04</h3>
                                <p>Receive Your {`NFT’s`}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            {/* !Steps Shortcode */}
            <div className="fn_cs_join">
                <div className="join_in">
                    <h3 className="fn__maintitle upper" data-text="Join Our Community">
                        Join Our Community
                    </h3>
                    <p>
                        There are many variations of passages of lorem ipsum available, but
                        the majority have suffered alteration in some form, by injected
                        humour, or randomised words which {`don't`} look even slightly
                        believable.
                    </p>
                    <div className="buttons">
                        <a
                            href="https://opensea.io/"
                            className="metaportal_fn_button"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <span>Buy On Opensea</span>
                        </a>
                        <a
                            href="#"
                            className="metaportal_fn_button"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <span>WhiteList Now</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
