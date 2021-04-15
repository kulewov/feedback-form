<style type="text/css">
    @font-face {
        font-family: 'Open Sans';
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'Open Sans Semibold';
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'Open Sans Semibold Italic';
        font-style: normal;
        font-weight: normal;
    }
    .hover_effect {
        position: relative;
    }
    .hover_effect:hover::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, .25);
        content: '';
    }
    p > a {
        color: inherit;
    }
</style>