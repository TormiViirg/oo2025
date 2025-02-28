package ee.tormi.proovikt;

/*Libisev keskmine

 * Tee uus Spring rakendus. Lisa entity (vabalt valitud nimega), mis hoiab enda sees nii automaatselt genereeritud ID’d (Long) kui ka arvu (int). Tee application.properties sisse andmebaasiühendus. Tee entity nimele vastav Repository ja Controller. Repository seo Controlleriga @Autowired abil. Tee üks API otspunkt arvude lisamiseks andmebaasi ning teine API otspunkt kõikide arvude vaatamiseks. Kontrolli töötamist Postmaniga.
 * Tee lisaks kolm API otspunkti: 1) tagastab numbrina kõikide andmebaasis olevate numbrite summa (täisnumber) 2) tagastab kõikide andmebaasis olevate arvude aritmeetilise keskmise (komakohaga) 3) tagastab kõige suurema numbri, mis andmebaasis leidub (täisnumber)
 * Koosta API otspunkt andmebaasis olevate arvude libiseva keskmise leidmiseks. Väljundiks on massiiv, mis on andmebaasis olevatest arvudest kahe elemendi võrra lühem ning mille iga elemendi väärtuseks on andmebaasis vastava elemendi ning selle järgmise ja ülejärgmise elemendi keskmine.
 */
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProoviktApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProoviktApplication.class, args);
	}

}
