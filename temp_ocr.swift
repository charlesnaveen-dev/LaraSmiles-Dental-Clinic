
import Foundation
import Vision
import AppKit

let fm = FileManager.default
let imgDir = "images"
if let files = try? fm.contentsOfDirectory(atPath: imgDir) {
    for file in files.sorted() where !file.hasPrefix(".") {
        let path = (imgDir as NSString).appendingPathComponent(file)
        guard let nsImage = NSImage(contentsOfFile: path),
              let cgImage = nsImage.cgImage(forProposedRect: nil, context: nil, hints: nil) else { continue }
        
        let requestHandler = VNImageRequestHandler(cgImage: cgImage, options: [:])
        let request = VNRecognizeTextRequest { (request, error) in
            guard let observations = request.results as? [VNRecognizedTextObservation] else { return }
            let recognizedStrings = observations.compactMap { $0.topCandidates(1).first?.string }
            if !recognizedStrings.isEmpty {
                print("=== File: \(file) ===")
                print(recognizedStrings.joined(separator: " | "))
            }
        }
        try? requestHandler.perform([request])
    }
}
