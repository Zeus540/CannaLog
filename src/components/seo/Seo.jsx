import { Helmet } from "react-helmet"

function Seo(props) {

    const cleanTitle = (title) => {

        let formattedName = title
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        return formattedName
    }

    return (
        <Helmet>
            {props?.user !== undefined &&
                <title>CannaLog - {cleanTitle(props.title)} {props?.user && `Grown By ` + cleanTitle(props?.user)}</title>
            }
            {props?.user == undefined &&
                <title>CannaLog - {cleanTitle(props.title)} </title>
            }
            <meta charSet="utf-8" />
            {props?.content !== undefined &&
                <meta
                    name="description"
                    content={props.content} />
            }
            {props?.noFollow &&
                 <meta
                 name="robots"
                 content="noindex,nofollow"/>
            }
            <link rel="canonical" href={window.location.href} />

        </Helmet>
    )
}

export default Seo