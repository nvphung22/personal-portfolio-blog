import { Container } from 'reactstrap'

const BasePage = (props) => {
    const { className, title } = props;
    // use defaultProps
    // const className = props.className || '';
    return (
        <div className={`base-page ${className}`}>
            <Container>
                {title && <div className='page-header'><h1 className='page-header-title'>{title}</h1></div>}
                {props.children}
            </Container>
        </div>
    )
}

BasePage.defaultProps = {
    className: ''
}

export default BasePage;