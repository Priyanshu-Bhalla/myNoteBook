import React from 'react'
import AboutLogo from '../img/about.svg';

export default function About() {

    return (
        <>
            <div className="about_upper">
                <div className="wrapper">
                    <div className="static_txt">Looking For a</div>
                    <ul className="dynamic_txts">
                        <li><span>Private</span></li>
                        <li><span>Safe n </span></li>
                        <li><span>Secure</span></li>
                        <li><span>NoteBook?</span></li>
                    </ul>

                </div>
                <p className="subtitleA mb-3">Well, you are at the right place!!</p>

            </div>
            <div className="about_lower">
                <div>
                    <img src={AboutLogo} alt="" className="about_img" />
                </div>
                <div className="about_details">
                    <p>Ever got a great <span>Idea</span> stuck in your head but couldnt find a <span>safe</span> and <span>secure</span>  place to note it down?
                        Wondering someone would <span>steal</span>  that idea? Or <span>forgot</span>  where you saved it on your Desktop?? Dont worry we <span>WE GOT YOU</span> .
                        Presenting You a <span>Private Note Space</span>  Environment where you can easily save your crazy ideas or secrets without worrying about anyone! What you waiting for??? <span>Hurry Up</span>  and <span>Sign Up</span> to your own myNotebook for <span>FREE!!</span> </p>
                    <button className="btn btn-primary btn-md btn_about">Learn More</button>
                </div>
            </div>
        </>
    )
}
