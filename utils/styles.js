import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
    navbar: {
        backgroundColor: '#e00e0e',
        '& a': {
            color: '#ffffff',
            marginLeft: 10,
        },
    },
    brand: {
        fontWeight: 'bold',
        fontSize: '1.5rem'
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',

    },
    rightSide: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    grow: {
        flexGrow: 1
    },
    main: {
        minHeight: '50vh'
    },
    gridMain: {
        flexGrow: 1
    },
    section: {
        marginTop: 20,
        marginBottom: 20
    },
    form: {
        maxWidth: 800,
        margin: '0 auto'
    },
    navbarButton: {
        color: '#ffffff',
        textTransform: 'initial'
    },
    transparentBackground: {
        backgroundClip: 'transparent'
    }

});

