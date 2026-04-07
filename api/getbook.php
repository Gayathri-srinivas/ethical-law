<?php
header('Content-Type: application/json; charset=utf-8');

// ⭐ Enable compression for faster transfer
if (!ob_start('ob_gzhandler')) {
    ob_start();
}

try {
    $bookNumber = isset($_GET['book']) ? intval($_GET['book']) : 0;
    
    if ($bookNumber < 1 || $bookNumber > 66) {
        http_response_code(400);
        echo json_encode([
            'error' => true, 
            'message' => 'Book number must be between 1 and 66'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    $bookFileNames = [
        "01_ఆదికాండము", "02_నిర్గమకాండము", "03_లేవీయకాండము", 
        "04_సంఖ్యాకాండము", "05_ద్వితీయోపదేశకాండము", "06_యెహోషువ", 
        "07_న్యాయాధిపతులు", "08_రూతు", "09_1సమూయేలు", "10_2సమూయేలు", 
        "11_1రాజులు", "12_2రాజులు", "13_1దినవృత్తాంతములు", 
        "14_2దినవృత్తాంతములు", "15_ఎజ్రా", "16_నెహెమ్యా", "17_ఎస్తేరు", 
        "18_యోబు", "19_కీర్తనలు", "20_సామెతలు", "21_ప్రసంగి", 
        "22_పరమగీతము", "23_యెషయా", "24_యిర్మియా", "25_విలాపవాక్యములు", 
        "26_యెహెజ్కేలు", "27_దానియేలు", "28_హోషేయ", "29_యోవేలు", 
        "30_ఆమోసు", "31_ఓబద్యా", "32_యోనా", "33_మీకా", "34_నహూము", 
        "35_హబక్కూకు", "36_జెఫన్యా", "37_హగ్గయి", "38_జెకర్యా", 
        "39_మలాకీ", "40_మత్తయి", "41_మార్కు", "42_లూకా", "43_యోహాను", 
        "44_అపొస్తలులకార్యములు", "45_రోమా", "46_1కొరింథీయులు", 
        "47_2కొరింథీయులు", "48_గలతీయులు", "49_ఎఫెసీయులు", 
        "50_ఫిలిప్పీయులు", "51_కొలొస్సయులు", "52_1థెస్సలొనీకయులు", 
        "53_2థెస్సలొనీకయులు", "54_1తిమోతి", "55_2తిమోతి", "56_తీతు", 
        "57_ఫిలేమోను", "58_హెబ్రీయులు", "59_యాకోబు", "60_1పేతురు", 
        "61_2పేతురు", "62_1యోహాను", "63_2యోహాను", "64_3యోహాను", 
        "65_యూదా", "66_ప్రకటన"
    ];
    
    $fileName = $bookFileNames[$bookNumber - 1];
    $filePath = __DIR__ . '../Books/' . $fileName . '.json';
    
    // ⭐ Cache key with version
    $cacheKey = 'bible_book_' . $bookNumber . '_v2';
    
    // ⭐⭐⭐ APCu with igbinary (FASTEST)
    if (function_exists('apcu_fetch')) {
        $data = apcu_fetch($cacheKey, $success);
        
        if ($success) {
            // ✅ Cache HIT - igbinary automatically deserializes
            header('X-Cache: HIT');
            echo $data;
            exit;
        }
    }
    
    // Cache MISS - Load from file
    if (!file_exists($filePath)) {
        http_response_code(404);
        echo json_encode([
            'error' => true, 
            'message' => 'Book file not found'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    $data = file_get_contents($filePath);
    
    if ($data === false) {
        throw new Exception('Failed to read book file');
    }
    
    // ⭐ Store in APCu with igbinary (automatic serialization)
    if (function_exists('apcu_store')) {
        apcu_store($cacheKey, $data, 86400); // 24 hours
    }
    
    header('X-Cache: MISS');
    echo $data;
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true, 
        'message' => 'Server error: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}

ob_end_flush();
?>
