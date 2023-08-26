// Command Summary

// Installation

// pip install git+https://github.com/facebookresearch/segment-anything.git

// clone repository and install
// git clone git@github.com:facebookresearch/segment-anything.git
// cd segment-anything; pip install -e .

// Optional Dependencies

// pip install opencv-python pycocotools matplotlib onnxruntime onnx

// Model Checkpoints

// ViT-H SAM model
// checkpoint: https://dl.fbaipublicfiles.com/segment_anything/sam_vit_h_4b8939.pth

// ViT-L SAM model
// checkpoint: https://dl.fbaipublicfiles.com/segment_anything/sam_vit_l_0b3195.pth

// ViT-B SAM model
// checkpoint: https://dl.fbaipublicfiles.com/segment_anything/sam_vit_b_01ec64.pth

// Getting Started

// from segment*anything import SamPredictor, sam_model_registry
// sam = sam_model_registry["<model_type>"](checkpoint="<path/to/checkpoint>")
// predictor = SamPredictor(sam)
// predictor.set_image(<your_image>)
// masks, *, \_ = predictor.predict(<input_prompts>)

// from segment_anything import SamAutomaticMaskGenerator, sam_model_registry
// sam = sam_model_registry["<model_type>"](checkpoint="<path/to/checkpoint>")
// mask_generator = SamAutomaticMaskGenerator(sam)
// masks = mask_generator.generate(<your_image>)

// python scripts/amg.py --checkpoint <path/to/checkpoint> --model-type <model_type> --input <image_or_folder> --output <path/to/output>

// ONNX Export

// python scripts/export_onnx_model.py --checkpoint <path/to/checkpoint> --model-type <model_type> --output <path/to/output>
