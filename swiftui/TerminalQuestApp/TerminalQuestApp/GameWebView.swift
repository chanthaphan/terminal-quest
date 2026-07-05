import SwiftUI
import WebKit

/// Full-screen WKWebView hosting the bundled Terminal Quest web game.
///
/// The repo's `web/` folder must be added to the Xcode target as a *folder
/// reference* (blue folder) so `Bundle.main` contains a literal `web/` directory
/// and every edit to the real folder syncs on the next build. See README-IOS.md.
struct GameWebView: UIViewRepresentable {
    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.allowsInlineMediaPlayback = true
        // WebAudio without a gesture requirement; sfx.js already resumes the
        // AudioContext on the first user tap.
        config.mediaTypesRequiringUserActionForPlayback = []
        // Persistent store: localStorage saves survive relaunches and re-deploys
        // (only deleting the app wipes them).
        config.websiteDataStore = .default()

        let webView = WKWebView(frame: .zero, configuration: config)
        webView.isOpaque = false
        webView.backgroundColor = .black
        webView.scrollView.backgroundColor = .black
        webView.scrollView.bounces = false
        webView.scrollView.alwaysBounceVertical = false
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        // Leave isScrollEnabled = true: the page itself doesn't overflow, but iOS
        // uses it to shift content when the keyboard covers the focused input.

        if let webDir = Bundle.main.url(forResource: "web", withExtension: nil) {
            let index = webDir.appendingPathComponent("index.html")
            webView.loadFileURL(index, allowingReadAccessTo: webDir)
        }
        return webView
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}
}
