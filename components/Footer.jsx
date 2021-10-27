import styles from '../styles/Home.module.css'
import GitHubIcon from '@mui/icons-material/GitHub';
function Footer() {
    return (
        <footer className={styles.footer}>
            <a
                href="https://github.com/BillyVector117"
                target="_blank"
                rel="noopener noreferrer"
            >
                Billy Rodríguez Morales{' '}
                <span className={styles.logo}>
                    <GitHubIcon /> {' '} {'v.1.0.0'}

                </span>
            </a>
        </footer>
    )
}

export default Footer
