import React from 'react'
import styled from "styled-components";
import {Root} from '../../utils/global_styles'


const Inner = styled.div`


padding: 80px 0px;
margin: 0px auto;
padding-top: 80px;
max-width: 1920px;
background:${(props) => `${props.theme.secondary}`};
color:${(props) => `${props.theme.text}`};


h2{
  margin: 20px 0px;
  color:${(props) => `${props.theme.accent}`};
}

@media (max-width: 1920px) {
    margin: 15px;
    padding-top: 0px;
  }

`;
const Heading = styled.h1`
font-size: 25px;

margin-top: 0px;
padding-top: 20px;
`;
const CookiePolicy = () => {
  return (
    <Root
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{duration:1}}
 
    > 
        <Inner>
        <Heading>Cookie Policy</Heading>



<h2><strong>What Are Cookies</strong></h2>

<p>As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.</p>

<h2><strong>How We Use Cookies</strong></h2>

<p>We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</p>

<h2><strong>Disabling Cookies</strong></h2>

<p>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies. </p>


<ul>

<li>
    <h2>Account related cookies</h2>
    <p>If you create an account with us then we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out however in some cases they may remain afterwards to remember your site preferences when logged out.</p>
</li>

<li>
    <h2>Login related cookies</h2>
    <p>We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in.</p>
</li>




<li>
    <h2>Forms related cookies</h2>
    <p>When you submit data to through a form such as those found on contact pages or comment forms cookies may be set to remember your user details for future correspondence.</p>
</li>

<li>
    <h2>Site preferences cookies</h2>
    <p>In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.</p>
</li>

</ul>

<h2><strong>Third Party Cookies</strong></h2>

<p>In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.</p>

<ul>

<li>
    <p>This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.</p>
    <p>For more information on Google Analytics cookies, see the official Google Analytics page.</p>
</li>




<li>
    <p>The Google AdSense service we use to serve advertising uses a DoubleClick cookie to serve more relevant ads across the web and limit the number of times that a given ad is shown to you.</p>
    <p>For more information on Google AdSense see the official Google AdSense privacy FAQ.</p>
</li>




<li>
    <p>We also use social media buttons and/or plugins on this site that allow you to connect with your social network in various ways. For these to work the following social media sites including; , will set cookies through our site which may be used to enhance your profile on their site or contribute to the data they hold for various purposes outlined in their respective privacy policies.</p>
</li>

</ul>

<ul>


</ul>
</Inner>
    </Root>
  )
}

// including; {List the social networks whose features you have integrated with your site?:12},
export default CookiePolicy