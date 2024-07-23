plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.jetbrains.kotlin.android)
}

android {
    namespace = "com.asr.booknestin"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.asr.booknestin"
        minSdk = 28
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
    buildFeatures {
        compose = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.1"
    }
    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

dependencies {
    // Navigation testing
    androidTestImplementation (libs.navigation.testing)
    //Navigation Component
    implementation (libs.androidx.navigation.fragment.ktx)
    implementation (libs.androidx.navigation.ui.ktx)

    //API
    implementation(libs.retrofit)
    implementation (libs.retrofit2.converter.gson)
    implementation(libs.coil.kt.coil.compose)
    // Kotlin
    implementation(libs.androidx.navigation.fragment.ktx) // Provides Kotlin extensions for AndroidX navigation with fragments.
    implementation(libs.androidx.navigation.ui) // Provides components for handling UI navigation in Android apps.

    // Feature module Support
    implementation(libs.androidx.navigation.dynamic.features.fragment)
    implementation(libs.generativeai) // Supports dynamic feature modules in AndroidX navigation.

    // Testing Navigation
    androidTestImplementation(libs.androidx.navigation.testing) // Provides testing tools for AndroidX navigation.

    // Compose dependencies
    implementation(libs.androidx.navigation.compose) // Integrates navigation with Jetpack Compose.
    implementation(libs.androidx.core.ktx) // Kotlin extensions for core Android components.
    implementation(libs.androidx.lifecycle.runtime.ktx) // Kotlin extensions for Android Lifecycle runtime.
    implementation(libs.androidx.activity.compose) // Compose-specific extensions for Android activities.
    implementation(platform(libs.androidx.compose.bom)) // BOM for Compose dependencies to manage versions.

    // UI Components
    implementation(libs.androidx.ui) // Core UI components for Jetpack Compose.
    implementation(libs.androidx.ui.graphics) // Graphics components for Jetpack Compose.
    implementation(libs.androidx.ui.tooling.preview) // Tooling support for previewing Compose UI components.
    implementation(libs.androidx.material3) // Material Design 3 components for Android.

    // Testing dependencies
    testImplementation(libs.junit) // JUnit library for unit testing.
    androidTestImplementation(libs.androidx.junit) // AndroidX JUnit extensions for Android testing.
    androidTestImplementation(libs.androidx.espresso.core) // Espresso library for UI testing on Android.
    androidTestImplementation(platform(libs.androidx.compose.bom)) // BOM for managing versions of Compose dependencies in Android tests.
    androidTestImplementation(libs.androidx.ui.test.junit4) // JUnit 4 integration for Compose UI testing.

    // Debugging dependencies
    debugImplementation(libs.androidx.ui.tooling) // Tooling support for debugging Compose UI components.
    debugImplementation(libs.androidx.ui.test.manifest) // Provides a manifest for Compose UI testing in debug builds.
}