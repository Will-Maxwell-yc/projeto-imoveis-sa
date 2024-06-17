import { NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

import { ContentLink } from '../../style'

const Ajuda = () => {
    return (
        <ContentLink>
            <NavLink to="/sobrenos"><span className='p-1'>Ajuda</span><FontAwesomeIcon icon={faAngleDown} /></NavLink>
        </ContentLink>
    )
}

export default Ajuda