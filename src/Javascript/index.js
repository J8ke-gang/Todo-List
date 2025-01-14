import domManipulation from './domManipulation';
import "./styles.css";

//tying together app and dom modules
document.addEventListener('DOMContentLoaded', () => {
    domManipulation.init();
});