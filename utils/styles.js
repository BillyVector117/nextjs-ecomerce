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
        minHeight: '80vh'
    },
    gridMain: {
        flexGrow: 1
    },
    section: {
        marginTop: 20,
        marginBottom: 20
    }

});

