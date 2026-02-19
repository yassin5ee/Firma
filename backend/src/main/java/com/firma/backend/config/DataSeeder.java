package com.firma.backend.config;

import com.firma.backend.model.Product;
import com.firma.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Seeds sample products on first startup when the collection is empty.
 * Set the environment variable SEED_DATA=true to enable.
 */
@Slf4j
@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    @Bean
    CommandLineRunner seedProducts(ProductRepository repo) {
        return args -> {
            if (!"true".equalsIgnoreCase(System.getenv("SEED_DATA"))) return;
            if (repo.count() > 0) {
                log.info("Products already exist — skipping seed.");
                return;
            }

            log.info("Seeding sample products…");

            repo.saveAll(List.of(
                    Product.builder()
                            .title("Compost Végétal Bio")
                            .description("Riche en azote, idéal pour maraîchage. Disponible en vrac.")
                            .category("Compost")
                            .price(120.0)
                            .unit("Tonne")
                            .imageUrl("https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80")
                            .address("Région Nord")
                            .region("nord")
                            .build(),

                    Product.builder()
                            .title("Fumier de Cheval")
                            .description("Fumier pailleux bien décomposé (6 mois). À venir chercher.")
                            .category("Fumier")
                            .price(80.0)
                            .unit("Tonne")
                            .imageUrl("https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=800&q=80")
                            .address("Région Centre")
                            .region("centre")
                            .build(),

                    Product.builder()
                            .title("Purin d'Ortie")
                            .description("Stimulant naturel et répulsif. Bidons de 20 L.")
                            .category("Liquide")
                            .price(15.0)
                            .unit("Bidon")
                            .imageUrl("https://plus.unsplash.com/premium_photo-1664302152996-33923ed34703?auto=format&fit=crop&w=800&q=80")
                            .address("Région Sud")
                            .region("sud")
                            .build(),

                    Product.builder()
                            .title("Cendres de Bois")
                            .description("Excellent apport en potasse. Tamisé et sec.")
                            .category("Cendres")
                            .price(30.0)
                            .unit("Sac 25 kg")
                            .imageUrl("https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80")
                            .address("Région Ouest")
                            .region("ouest")
                            .build(),

                    Product.builder()
                            .title("Fumier de Vache")
                            .description("Fumier mature, prêt à l'emploi. Livraison possible.")
                            .category("Fumier")
                            .price(60.0)
                            .unit("Tonne")
                            .imageUrl("https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80")
                            .address("Région Est")
                            .region("est")
                            .build()
            ));

            log.info("Seeding complete — {} products inserted.", repo.count());
        };
    }
}
