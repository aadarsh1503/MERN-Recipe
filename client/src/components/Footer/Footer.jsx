import React from 'react';
import { Link } from 'react-router-dom';
import { 
    InstagramOutlined, 
    TwitterOutlined, 
    LinkedinOutlined 
} from '@ant-design/icons';

const Footer = () => {
    return (
        <div className="bg-gray-950 h-96 px-4 py-8 max-[768px]:h-fit">
            <div className="flex justify-around items-center h-full p-4 text-white max-[900px]:p-0 max-[768px]:flex-col max-[768px]:p-4 max-[768px]:justify-center max-[450px]:p-0">
                <div className="h-full w-3/5 p-4 flex flex-col justify-between items-center max-[900px]:p-0 max-[768px]:justify-center max-[768px]:h-2/5 max-[768px]:w-full">
                    <div className="w-full h-3/5 p-4 flex justify-start items-center text-6xl font-extrabold max-[768px]:text-5xl max-[639px]:text-4xl max-[550px]:text-3xl">
                        FusionX
                    </div>
                    <div className="w-full h-2/5 px-4 py-1 flex flex-col justify-start items-start text-base gap-1 max-[768px]:hidden">
                        <div>Noida, Uttar Pradesh</div>
                        <div>&copy; 2024 FusionX</div>
                    </div>
                </div>
                <div className="h-full w-2/5 p-4 flex flex-col max-[900px]:pr-0 max-[900px]:pl-6 max-[825px]:pl-7 max-[800px]:pl-12 max-[768px]:p-4 max-[768px]:w-full max-[768px]:h-3/5 max-[639px]:gap-4">
                    <div className="h-3/5 text-lg font-medium flex justify-center gap-1 max-[768px]:p-4 max-[450px]:pr-0 max-[400px]:pl-0">
                        <div className="w-1/2 flex flex-col justify-evenly gap-2 max-[768px]:gap-4">
                            <Link to="/about">About</Link>
                            <Link to="/contactus">Contact Us</Link>
                            <Link to="/termsOfService">Terms Of Service</Link>
                        </div>
                        <div className="w-1/2 flex flex-col justify-evenly gap-2 max-[768px]:gap-4">
                            <Link to="/pricing">Pricing</Link>
                            <Link to="/admin/blogs">Blogs</Link>
                            <Link to="/privacy">Privacy</Link>
                            <Link to="/user">Users</Link>
                        </div>
                    </div>
                    <div className="h-2/5 w-full flex max-[768px]:flex-col">
                        <div className="w-fit h-fit py-1 flex justify-between gap-12 text-4xl max-[768px]:w-full max-[768px]:justify-center max-[639px]:text-3xl">
                            <a href="https://in.linkedin.com/">
                                <LinkedinOutlined />
                            </a>
                            <a href="https://twitter.com/?lang=en">
                                <TwitterOutlined />
                            </a>
                            <a href="https://www.instagram.com/">
                                <InstagramOutlined />
                            </a>
                        </div>
                        <div className="text-base flex flex-col items-center p-4 min-[768px]:hidden">
                            <div>Noida, Uttar Pradesh</div>
                            <div>&copy; 2024 FusionX</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
