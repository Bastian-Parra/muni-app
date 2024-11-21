import PropTypes from 'prop-types'

function ContainerSection({ children, className = 'container-section' }) {
    return (
        <section className={className}>
            {children}
        </section>
    )
}

ContainerSection.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
}

export default ContainerSection