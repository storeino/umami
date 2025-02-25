import LanguageButton from '@/components/input/LanguageButton';
import SettingsButton from '@/components/input/SettingsButton';
// eslint-disable-next-line css-modules/no-unused-class
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.buttons}>
        <LanguageButton />
        <SettingsButton />
      </div>
    </header>
  );
}

export default Header;
