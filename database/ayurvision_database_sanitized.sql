-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 27, 2026 at 02:13 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ayurvision_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `ayurvedic_plants`
--

CREATE TABLE `ayurvedic_plants` (
  `id` int(11) NOT NULL,
  `plant_name` varchar(150) NOT NULL,
  `scientific_name` varchar(150) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `uses` text DEFAULT NULL,
  `benefits` text DEFAULT NULL,
  `precautions` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ayurvedic_plants`
--

INSERT INTO `ayurvedic_plants` (`id`, `plant_name`, `scientific_name`, `description`, `uses`, `benefits`, `precautions`, `image`, `created_at`) VALUES
(6, 'Tulsi', 'Ocimum tenuiflorum', 'Tulsi is one of the most sacred and important medicinal herbs in Ayurveda. Revered as the “Queen of Herbs,” Tulsi is widely known for its healing, immunity-boosting, and spiritual significance. Its leaves are commonly used in traditional remedies and herbal preparations.', 'Tulsi is commonly consumed as herbal tea, fresh leaves, juice, powder, kadha, essential oil, and Ayurvedic medicine.', 'Boosts immunity, improves respiratory health, reduces stress, supports digestion, helps fight infections, and promotes overall wellness.', 'Excessive consumption may lower blood sugar levels or affect blood thinning medicines. Pregnant women should consult a healthcare professional before regular medicinal use.', '1779391888_TULSI.webp', '2026-03-23 09:22:03'),
(7, 'Neem / Nimba', 'Azadirachta indica', 'Neem is one of the most powerful and widely used medicinal plants in Ayurveda. Known for its strong antibacterial and healing properties, every part of the Neem tree including leaves, bark, seeds, and oil is used for medicinal purposes.', 'Neem is commonly used as leaf paste, juice, powder, oil, herbal tea, soaps, toothpaste, and Ayurvedic medicines.', 'Used for skin disorders, acne, wound healing, blood purification, dental care, fever, fungal infections, and immunity improvement. Neem is also used in natural pesticides and hair care treatments.', 'Excessive consumption may cause stomach irritation or low blood sugar. Pregnant women and small children should avoid high doses of Neem products without medical advice.', '1779391661_NEEM.jpg', '2026-03-23 09:22:03'),
(8, 'Ashwagandha', 'Withania somnifera (L.) Dunal.', 'Ashwagandha (Withania somnifera) is a potent Ayurvedic medicinal shrub, often called \"Indian ginseng,\" used for thousands of years to manage stress, anxiety, and fatigue. As an adaptogen, it helps balance cortisol levels, potentially enhancing sleep, physical performance, and mental well-being', 'Used in powders, capsules, milk tonics, and herbal formulations.', 'Supports stress relief, strength, stamina, and sleep quality.', 'Pregnant women should use only with medical guidance.', '1776849059_ashwagandha.jpg', '2026-03-23 09:22:03'),
(9, 'Aloe Vera', 'Aloe barbadensis Miller', 'Aloe Vera is a succulent plant valued in Ayurveda for skin soothing and digestive support.', 'Used in gels, juices, skin care, and cooling remedies.', 'Supports skin hydration, minor burns, and digestion.', 'Avoid overconsumption of latex part; may cause loose motion.', '1776848861_alo vera.jfif', '2026-03-23 09:22:03'),
(10, 'Turmeric / HALDI', 'Curcuma longa', 'Turmeric is one of the most widely used medicinal and culinary herbs in Ayurveda and Indian households. Known for its bright yellow color and powerful healing properties, Turmeric has been used for centuries for treating infections, improving immunity, and promoting overall health.', 'Turmeric is commonly used as powder, paste, herbal milk (golden milk), Ayurvedic medicine, herbal tea, and skincare applications.\r\n', 'Supports immunity, reduces inflammation, improves skin health, aids digestion, promotes joint health, and helps in natural detoxification.', 'Excessive consumption may cause stomach irritation or interact with blood-thinning medicines. Individuals with gallbladder problems should consult a healthcare professional before high medicinal use.', '1779392051_HALDI.webp', '2026-03-23 09:22:03'),
(11, 'Ginger , Adrak / Sunthi (Dry Ginger)', 'Zingiber officinale', 'Ginger is a widely used medicinal and culinary herb in Ayurveda and traditional medicine. Known for its strong aroma and healing properties, Ginger has been used for centuries to support digestion, relieve cold symptoms, and improve overall health.', 'Ginger is commonly consumed as fresh root, dry powder, herbal tea, juice, kadha, spice, and Ayurvedic medicine.', 'Improves digestion, relieves nausea, supports immunity, reduces inflammation, improves blood circulation, and helps in respiratory health.', 'Excessive consumption may cause acidity or stomach irritation. Individuals with bleeding disorders or taking blood-thinning medicines should consult a healthcare professional before medicinal use.', '1779392275_GINGER.jfif', '2026-03-23 09:22:03'),
(12, 'Amla', 'Gooseberry, Phyllanthus emblica , ', 'Amla is a vitamin C rich Ayurvedic fruit known for rejuvenation and immunity support. It is a highly nutritious, tart green fruit, often called a \"superfruit\" due to its extremely high vitamin C content, which is equivalent to 20 oranges in a 100-gram serving.', 'Used in chyawanprash , juices, powders, and It is famously used in Ayurveda for its medicinal properties and consumed as candy and pickles.', 'Supports immunity, digestion, skin glow, Rich in antioxidants and vitamin C, boosts immunity, manages blood sugar levels, and is used for hair/skin care. ', 'Sour fruit may irritate very sensitive stomachs if overused.', '1775471790_amla.webp', '2026-03-23 09:22:03'),
(13, 'Brahmi', 'Bacopa monnieri', 'Brahmi is a highly valued medicinal herb in Ayurveda known for its brain-boosting and calming properties. It has been traditionally used to improve memory, concentration, intelligence, and mental wellness. Brahmi is commonly used in Ayurvedic tonics and herbal formulations for cognitive support.', 'Brahmi is commonly used as powder, juice, herbal tea, capsules, Ayurvedic syrups, and medicated oils.', 'Enhances memory and learning ability, reduces stress, supports nervous system health, improves focus, promotes mental calmness, and may help improve sleep quality.', 'Excessive consumption may cause nausea, stomach discomfort, or fatigue in some individuals. Pregnant or breastfeeding women should consult a healthcare professional before medicinal use.', '1779392399_Brahmi.jfif', '2026-03-23 09:22:03'),
(14, 'Shatavari', 'Asparagus racemosus', 'Shatavari is a well-known medicinal herb in Ayurveda especially valued for supporting women’s health and overall body strength. It is considered a rejuvenating herb that helps improve immunity, hormonal balance, digestion, and vitality. Shatavari is also used as a natural cooling and nourishing tonic.', 'Shatavari is commonly used as powder, capsules, herbal tea, syrup, or mixed with warm milk and honey. It is also available in Ayurvedic tonic formulations.', 'Supports women’s reproductive health, improves immunity, promotes hormonal balance, helps reduce stress, improves digestion, increases energy, and supports lactation in breastfeeding mothers.', 'Excessive use may cause stomach discomfort or allergic reactions in some individuals. People with kidney problems or hormone-sensitive conditions should consult a healthcare professional before medicinal use.', '1779392932_Shatavari.jfif', '2026-03-23 09:22:03'),
(15, 'Giloy / Guduchi / Amrita', 'Tinospora cordifolia', 'Giloy is a famous medicinal herb in Ayurveda known for its immunity-boosting and healing properties. It is often called “Amrita,” meaning the root of immortality, because of its powerful health benefits. Giloy is widely used for improving immunity, fighting infections, and promoting overall wellness.', 'Giloy is commonly used as juice, powder, kadha, tablets, capsules, or herbal decoction. Fresh Giloy stem can also be boiled in water and consumed.', 'Boosts immunity, helps reduce fever, improves digestion, supports liver health, controls blood sugar levels, detoxifies the body, and helps fight infections.', 'Excessive use may cause constipation or low blood sugar levels. Pregnant women, breastfeeding mothers, and people with autoimmune diseases should consult a healthcare professional before medicinal use.', '1779392751_GILOY.jfif', '2026-03-23 09:22:03'),
(16, 'Arjuna', 'Terminalia arjuna', 'Arjuna bark is an Ayurvedic remedy traditionally valued for heart support.', 'Used in powders, decoctions, and heart health formulations.', 'Supports heart wellness and circulation.', 'Use with care alongside heart medications.', '1776848951_Arjuna.jfif', '2026-03-23 09:22:03'),
(17, 'Bael', 'Aegle marmelos', 'Bael is an Ayurvedic fruit tree known for digestive support and gut health.', 'Used in fruit pulp, sherbet, and digestive remedies.', 'Supports digestion and bowel regularity.', 'Excess use may worsen constipation in some people.', '1776848993_bael.jfif', '2026-03-23 09:22:03'),
(18, 'Mulethi / Yashtimadhu', 'Glycyrrhiza glabra', 'Mulethi is a popular medicinal herb in Ayurveda known for its soothing and healing properties. It is widely used for respiratory health, throat infections, digestion, and immunity support. Mulethi is naturally sweet in taste and has been used in traditional medicine for centuries.', 'Mulethi is commonly used as powder, herbal tea, kadha, syrup, lozenges, or chewing sticks. It can also be mixed with warm water or honey.', 'Helps relieve cough and sore throat, improves respiratory health, supports digestion, boosts immunity, reduces inflammation, and may help reduce acidity and stomach irritation.', 'Excessive consumption may increase blood pressure, cause water retention, or lower potassium levels. People with hypertension, kidney disease, or pregnant women should consult a healthcare professional before medicinal use.', '1779393191_Mulethi.jfif', '2026-03-23 09:22:03'),
(19, 'Pudina / Mint', 'Mentha arvensis', 'Pudina is a refreshing medicinal herb widely used in Ayurveda, traditional medicine, and culinary preparations. Known for its cooling effect and pleasant aroma, Pudina is commonly used for digestive health, respiratory relief, and refreshing the body and mind.', 'Pudina is commonly used as fresh leaves, juice, herbal tea, chutney, powder, essential oil, or mixed in drinks and food preparations.', 'Improves digestion, relieves nausea and bloating, freshens breath, supports respiratory health, helps cool the body, and may reduce stress and headaches.', 'Excessive consumption may cause acidity, allergic reactions, or stomach irritation in some individuals. People with acid reflux or sensitive digestive conditions should consult a healthcare professional before excessive medicinal use.', '1779395203_Pudina.jfif', '2026-03-23 09:22:03'),
(20, 'Curry Leaves / Kadi Patta / Meetha Neem', 'Murraya koenigii', 'Curry Leaves are a popular medicinal herb and culinary ingredient widely used in Ayurveda and Indian cooking. Known for their rich aroma and nutritional value, Curry Leaves are valued for supporting digestion, hair health, immunity, and overall wellness. The leaves contain various antioxidants and essential nutrients beneficial for the body.', 'Curry Leaves are commonly used as fresh leaves in cooking, herbal tea, juice, powder, chutney, or mixed with buttermilk and Ayurvedic preparations.', 'Improves digestion, supports hair growth, boosts immunity, helps control blood sugar levels, supports liver health, and may improve skin health due to its antioxidant properties.\r\n', 'Excessive consumption may cause stomach discomfort or low blood sugar levels in some individuals. People with diabetes or specific medical conditions should consult a healthcare professional before excessive medicinal use.', '1779395086_Curry Leaves.jfif', '2026-03-23 09:22:03'),
(21, 'Gavati Chaha / Lemon Grass', 'Cymbopogon citratus', 'Lemongrass is a fragrant medicinal herb widely used in Ayurveda and traditional medicine for its refreshing aroma and healing properties. It is commonly used in herbal teas, natural remedies, and aromatherapy. Lemongrass is valued for its calming, digestive, and detoxifying benefits.', 'Lemongrass is commonly used as herbal tea, kadha, essential oil, fresh leaves in cooking, or mixed with warm water and honey. It is also used in Ayurvedic and wellness products.', 'Supports digestion, helps reduce stress and anxiety, boosts immunity, aids detoxification, improves respiratory health, and may help relieve cold and fever symptoms.\r\n', 'Excessive consumption may cause dizziness, stomach discomfort, or allergic reactions in some individuals. Pregnant women and people with low blood pressure should consult a healthcare professional before excessive medicinal use.', '1779394964_Lemongrass.jfif', '2026-03-23 09:22:03'),
(22, 'Ajwain', 'Trachyspermum ammi (formerly Carum copticum)', ' In Ayurveda, it is known as Yamani, Yavani, or Ajomoda. It is widely recognized for its digestive, antiseptic, and respiratory benefits due to high thymol content.', 'Used in warm water, herbal mixes, and digestive remedies.', 'Supports digestion, bloating relief, and stomach comfort.', 'Use in moderation; excess may cause heat like.\r\n\r\nGastrointestinal Distress: Excessive intake can lead to stomach ulcers, acid reflux, heartburn, and a burning sensation in the stomach.\r\nNausea & Vomiting: Large quantities of thymol may cause dizziness, nausea, and vomiting.\r\n\r\nMouth Ulcers: Due to its heat-generating properties, it can trigger mouth sores or ulcers.\r\n\r\nAllergic Reactions: Some individuals may experience skin rashes, respiratory discomfort, or hives', '1776848877_Ajwain.jpg', '2026-03-23 09:22:03'),
(23, 'Fenugreek / Methi', 'Trigonella foenum-graecum', 'Fenugreek is a popular medicinal herb and spice widely used in Ayurveda and traditional medicine. It is known for its nutritional value, healing properties, and slightly bitter taste. Fenugreek seeds and leaves are commonly used for improving digestion, controlling blood sugar, and supporting overall health.', 'Fenugreek is commonly used as seeds, powder, herbal tea, soaked water, spice in food, or fresh leaves in cooking. It is also available in capsules and Ayurvedic formulations.', 'Supports digestion, helps control blood sugar levels, improves metabolism, boosts immunity, supports heart health, and may help improve hair and skin health.', 'Excessive consumption may cause stomach discomfort, diarrhea, or low blood sugar levels. Pregnant women and people taking diabetes medicines should consult a healthcare professional before excessive medicinal use.', '1779394594_Fenugreek.jfif', '2026-03-23 09:22:03'),
(24, 'Coriander / Dhaniya', 'Coriandrum sativum', 'Coriander is a widely used medicinal herb and culinary spice in Ayurveda and traditional medicine. Both its leaves and seeds are valued for their cooling, digestive, and detoxifying properties. Coriander is commonly used to improve digestion, support immunity, and enhance flavor in food.', 'Coriander is commonly used as fresh leaves, dried seeds, powder, herbal tea, spice in food, or soaked coriander water. It is also used in Ayurvedic remedies and detox drinks.', 'Improves digestion, helps cool the body, supports detoxification, boosts immunity, helps control blood sugar levels, and may improve skin and heart health.', 'Excessive consumption may cause allergic reactions or low blood sugar in some individuals. People with diabetes or low blood pressure should consult a healthcare professional before excessive medicinal use.', '1779394705_Coriander.jfif', '2026-03-23 09:22:03'),
(25, 'Fennel / Saunf', 'Foeniculum vulgare', 'Fennel is a fragrant medicinal herb and spice widely used in Ayurveda and traditional medicine. Known for its sweet aroma and cooling properties, Fennel is commonly used to improve digestion, freshen breath, and support overall health. Its seeds are widely used in herbal remedies and culinary preparations.', 'Fennel is commonly used as seeds, powder, herbal tea, mouth freshener, spice in food, or soaked fennel water. It is also used in Ayurvedic medicines and digestive preparations.', 'Improves digestion, reduces bloating and acidity, freshens breath, supports metabolism, helps cool the body, and may support respiratory and heart health.', 'Excessive consumption may cause allergic reactions or hormonal effects in sensitive individuals. Pregnant women and people with hormone-sensitive conditions should consult a healthcare professional before excessive medicinal use.', '1779394837_Saunf.jfif', '2026-03-23 09:22:03'),
(26, 'Black Pepper / Kali Mirch', 'Piper nigrum', 'Black Pepper is one of the most commonly used spices and medicinal herbs in Ayurveda. Known as the “King of Spices,” it is valued for its warming properties and health benefits. Black Pepper is widely used to improve digestion, boost immunity, and enhance the absorption of nutrients and herbal medicines.', 'Black Pepper is commonly used as whole peppercorns, powder, herbal tea, kadha, spice in food, or mixed with honey and warm water.', 'Improves digestion, boosts immunity, supports respiratory health, helps relieve cough and cold, enhances metabolism, and improves nutrient absorption in the body.', 'Excessive consumption may cause stomach irritation, acidity, or burning sensation. People with ulcers or digestive disorders should consult a healthcare professional before excessive medicinal use.', '1779394463_Black Pepper.jfif', '2026-03-23 09:22:03'),
(27, 'Cardamom / Elaichi', 'Elettaria cardamomum', 'Cardamom is a fragrant spice and medicinal herb widely used in Ayurveda and traditional medicine. Known as the “Queen of Spices,” it is valued for its refreshing aroma, digestive benefits, and healing properties. Cardamom is commonly used in herbal remedies, teas, and culinary preparations.', 'Cardamom is commonly used as whole pods, powder, herbal tea, kadha, spice, or mixed with milk and desserts. It is also used in Ayurvedic formulations and mouth fresheners.\r\n', 'Improves digestion, freshens breath, supports respiratory health, boosts metabolism, reduces bloating, and may help relieve cold and cough symptoms.\r\n', 'Excessive consumption may cause allergic reactions or stomach irritation in some individuals. People with gallstones or serious medical conditions should consult a healthcare professional before excessive medicinal use.', '1779394332_Cardamom.jfif', '2026-03-23 09:22:03'),
(28, 'Clove / Laung', 'Syzygium aromaticum', 'Clove is a highly valued aromatic spice and medicinal herb used in Ayurveda and traditional medicine. It is known for its strong flavor, warming properties, and powerful healing benefits. Clove is commonly used for dental care, digestion, respiratory health, and boosting immunity.', 'Clove is commonly used as whole spice, powder, herbal tea, kadha, essential oil, or mixed with honey and warm water. It is also used in dental remedies and Ayurvedic formulations.', 'Helps relieve toothache, improves digestion, supports respiratory health, boosts immunity, reduces inflammation, and may help fight infections due to its antibacterial properties.', 'Excessive consumption may cause mouth irritation, stomach discomfort, or liver problems. Clove oil should be used carefully and not in excessive amounts. Pregnant women and people with bleeding disorders should consult a healthcare professional before medicinal use.', '1779394184_CLOVE.jfif', '2026-03-23 09:22:03'),
(29, 'Cinnamon / Dalchini', 'Cinnamomum verum', 'Cinnamon is a well-known aromatic spice and medicinal herb used in Ayurveda and traditional medicine. It is valued for its warming properties, pleasant flavor, and numerous health benefits. Cinnamon is commonly used for improving digestion, controlling blood sugar, and supporting immunity.', 'Cinnamon is commonly used as powder, spice, herbal tea, kadha, essential oil, or mixed with warm water, milk, or honey.', 'Supports digestion, helps control blood sugar levels, improves immunity, reduces inflammation, promotes heart health, and may help relieve cold and cough symptoms.\r\n', 'Excessive consumption may cause mouth irritation, liver problems, or low blood sugar. People with liver disease, diabetes, or those taking blood-thinning medicines should consult a healthcare professional before excessive medicinal use.', '1779394063_Cinnamon.jfif', '2026-03-23 09:22:03'),
(30, 'Haritaki , Harad / Harade , Chebulic Myrobalan, Ink Nut', 'Terminalia chebula', 'Haritaki is one of the most important medicinal herbs in Ayurveda and is widely known as the “King of Medicines.” It is also one of the three fruits used in the famous Ayurvedic formulation Triphala. Haritaki is valued for its cleansing, rejuvenating, and healing properties.', 'Commonly used in powdered form, herbal tablets, Ayurvedic decoctions, and Triphala preparations.', 'Used for digestive disorders, constipation, cough, sore throat, skin problems, detoxification, and improving metabolism. It is also used for oral health and immunity support.', 'Excessive consumption may cause dehydration or loose motions. Pregnant women and individuals with severe weakness should consult a healthcare professional before use.\r\n', '1779391464_Haritaki.webp', '2026-03-23 09:22:03'),
(31, 'Bibhitaki', 'Terminalia bellirica', 'Bibhitaki is a well-known medicinal plant in Ayurveda and is one of the three fruits used in the famous Ayurvedic formulation Triphala. It is valued for its cleansing, rejuvenating, and healing properties.', 'The fruit is commonly used in powdered form, herbal decoctions, Ayurvedic tablets, and Triphala formulations.', 'Used for treating cough, cold, sore throat, digestive disorders, constipation, and respiratory problems. Also used in hair care and detoxification therapies.\r\n', 'Excessive consumption may cause dehydration or digestive discomfort. Pregnant women and individuals with serious medical conditions should consult a healthcare professional before use.', '1779391135_Bibhitaki.jfif', '2026-03-23 09:22:03'),
(32, 'Triphala', 'Terminalia chebula, Terminalia bellirica, Phyllanthus emblica', 'Triphala is a classical Ayurvedic blend of three fruits used for digestive and detox support.', 'Used as powder, tablets, and nightly digestive support.', 'Supports digestion, bowel regularity, and gentle cleansing.', 'May loosen stools if overused.', '1779390808_Triphala.jpg', '2026-03-23 09:22:03'),
(33, 'Gotu Kola ,Mandukaparni , Jalbrahmi', 'Centella asiatica', 'Known in Ayurveda as Mandukaparni or Jalbrahmi, Gotu Kola (Centella asiatica) is revered as a \"Medhya Rasayana\" (brain tonic).', 'Used in juices, powders, oils, and herbal formulations.', 'Supports skin health, focus, and circulation.', ' improper or excessive use can cause side effects:\r\n\r\nDigestive issues: Upset stomach, nausea, or diarrhea.\r\nNeurological: Mild headaches or dizziness.\r\nAllergies: Topical application may cause skin itching or redness in sensitive individuals.', '1779351975_Gotu Kola.jfif', '2026-03-23 09:22:03'),
(34, 'Moringa', 'Moringa oleifera', 'Moringa is a nutrient-rich medicinal plant used in Ayurveda for vitality and nourishment.', 'Used in powders, leaves, soups, and supplements.', 'Supports energy, nutrition, and overall wellness.', 'Use in moderate amounts.', '1776848804_Moringa.jfif', '2026-03-23 09:22:03'),
(35, 'Sarpagandha', 'Rauvolfia serpentina', 'Sarpagandha is an Ayurvedic medicinal root traditionally used under expert guidance.', 'Used in classical Ayurvedic preparations.', 'Traditionally supports calming and balance.', 'Should only be used under qualified supervision.', '1776848766_Sarpagandha.jfif', '2026-03-23 09:22:03'),
(36, 'Vasaka', 'Justicia adhatoda', 'Vasaka is a medicinal shrub used in Ayurveda for cough and respiratory support.', 'Used in syrups, decoctions, and herbal remedies.', 'Supports respiratory comfort and cough relief.', 'Use in proper dosage.', '1776848719_Vasaka.jfif', '2026-03-23 09:22:03'),
(37, 'Kalmegh', 'Andrographis paniculata', 'Kalmegh is a bitter Ayurvedic herb known for liver and immunity support.', 'Used in juices, powders, and immune formulas.', 'Supports liver wellness and immunity.', 'Its bitterness may not suit everyone; use in moderation.', '1776848626_Kalmegh.jfif', '2026-03-23 09:22:03'),
(38, 'Manjistha', 'Rubia cordifolia', 'Manjistha is an Ayurvedic herb known for skin support and blood purification traditions.', 'Used in powders, decoctions, and skin formulations.', 'Supports skin clarity and internal balance.', 'Use under guidance if on medications.', '1776848511_Manjistha.jfif', '2026-03-23 09:22:03'),
(39, 'Safed Musli', 'Chlorophytum borivilianum', 'Safed Musli is an Ayurvedic herb valued for vitality and strength support.', 'Used in powders, capsules, and wellness tonics.', 'Supports Stamina, vitality, and nourishment.', 'Use in recommended dosage.', '1776848400_Safed Musli.jfif', '2026-03-23 09:22:03'),
(40, 'Bhringraj', 'Eclipta alba', 'Bhringraj is a classic Ayurvedic herb famous for hair care and liver support.', 'Used in hair oil, powders, and herbal tonics.', 'Supports hair health, scalp care, and wellness.', 'Use internal forms in proper dosage only.', '1776848327_Eclipta prostrata.jfif', '2026-03-23 09:22:03'),
(42, 'Astragalus crassicarpus', 'Astragalus crassicarpus', 'Astragalus crassicarpus, known as ground plum or buffalo plum, is a perennial species of flowering plant in the legume family, Fabaceae, native to North America. It was described in 1813. The fruit is edible and was used by Native Americans as food and horse medicine. It is a host of afranius duskywing larvae. It is also known as groundplum milkvetch and pomme de prairie.', 'Not available', 'Not available', 'Not available', '1776847817_Astragalus crassicarpus', '2026-03-28 08:35:16');

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `issue_type` varchar(50) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `admin_reply` text DEFAULT NULL,
  `reply_updated_at` datetime DEFAULT NULL,
  `resolved_at` datetime DEFAULT NULL,
  `status` enum('new','read','resolved') DEFAULT 'new',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `saved_library`
--

CREATE TABLE `saved_library` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `plant_id` int(11) NOT NULL,
  `uploaded_image` varchar(255) DEFAULT NULL,
  `saved_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ayurvedic_plants`
--
ALTER TABLE `ayurvedic_plants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `saved_library`
--
ALTER TABLE `saved_library`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `plant_id` (`plant_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ayurvedic_plants`
--
ALTER TABLE `ayurvedic_plants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `saved_library`
--
ALTER TABLE `saved_library`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `saved_library`
--
ALTER TABLE `saved_library`
  ADD CONSTRAINT `saved_library_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `saved_library_ibfk_2` FOREIGN KEY (`plant_id`) REFERENCES `ayurvedic_plants` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
