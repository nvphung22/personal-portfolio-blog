import React, { Children } from 'react';
import { Link } from '../routes';
import { withRouter } from 'next/router';

const ActiveLink = ({ children, router, ...props }) => {
    const child = Children.only(children);
    let className = child.props.className || '';

    if (router.asPath === props.route) {
        className = `${className} ${props.classActiveName}`
    }

    delete props.classActiveName;

    return <Link {...props}>{React.cloneElement(child, { className })}</Link>
}

export default withRouter(ActiveLink);