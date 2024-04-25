import { authBackground } from '../../assets';
import { logo } from '../../assets';
import styles from './AuthenticationWrapper.module.scss';

type Props = {
  title: string;
  subtitle: string;
  isLoading?: boolean;
  children?: React.ReactNode;
};

const AuthenticationWrapper = ({
  title,
  subtitle,
  isLoading = false,
  children,
}: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.mainContainer}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>{title}</h1>
            <h2 className={styles.subtitle}>{subtitle}</h2>
          </div>
          <div className={isLoading ? styles.loader : styles.line}></div>
          {children}
        </div>
      </div>
      <div
        className={styles.logo}
        style={{
          backgroundImage: `url(${authBackground})`,
        }}
      >
        <img src={logo} alt='Logo' className={styles.logoImg} />
        <h2 className={styles.logoTitle}>SmartTale</h2>
        <p className={styles.logoSubtitle}>
          Мониторинг и управление швейным производством
        </p>
      </div>
    </div>
  );
};

export default AuthenticationWrapper;
