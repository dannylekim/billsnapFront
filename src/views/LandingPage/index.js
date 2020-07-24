import LandingPage from './LandingPage.jsx';
import { connect } from 'react-redux'
import { toggleLandingPageForm } from '../../redux/actions/applicationActions';

const mapStateToProps = (state) => ({
    formType: state.application.showRegisterFirst ? 'register' : 'login'
  })
  
const mapDispatchToProps = (dispatch) => ({
    toggleFormType: () => dispatch(toggleLandingPageForm())
})

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);