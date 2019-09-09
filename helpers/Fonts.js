import FontFaceObserver from 'fontfaceobserver';
// or use this syntax, both works
// const FontFaceObserver = require('fontfaceobserver');

const LoadFonts = () => {
    const montserrat = new FontFaceObserver('Montserrat');

    montserrat.load().then(() => {
        // console.log('montserrat loaded')
        document.documentElement.classList.add('montserrat-loaded');
    });
}

export default LoadFonts;