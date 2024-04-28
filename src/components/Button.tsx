import { ComponentPropsWithoutRef } from "react"

// type ButtonProps = {
//     element: 'button'
// } & ComponentPropsWithoutRef<'button'>

// type AnchorProps = {
//     element: 'anchor'
// } & ComponentPropsWithoutRef<'a'>

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    href?: never;
}

type AnchorProps = ComponentPropsWithoutRef<'a'> & {
    href?: string
}

function isAnchorProps(props: ButtonProps | AnchorProps): props is AnchorProps {
    return 'href' in props;
}

export default function Button (props: ButtonProps | AnchorProps) {
    if(isAnchorProps(props)) {
        return <a className="button" {...props}></a>
    }
    
    return <button className="button" {...props}></button>
}