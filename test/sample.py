from typing import List, Optional
import math

class DataProcessor:
    """A class for processing numerical data with various algorithms."""
    
    def __init__(self, data: List[float]):
        self.data = data
        self._processed = False
    
    def calculate_statistics(self) -> dict:
        """Calculate basic statistics for the data."""
        if not self.data:
            raise ValueError("No data available")
        
        n = len(self.data)
        mean = sum(self.data) / n
        variance = sum((x - mean) ** 2 for x in self.data) / n
        
        return {
            "mean": mean,
            "std_dev": math.sqrt(variance),
            "min": min(self.data),
            "max": max(self.data)
        }
    
    @property
    def is_processed(self) -> bool:
        return self._processed
    
    def process_data(self, threshold: Optional[float] = None) -> List[float]:
        """Process the data with an optional threshold filter."""
        processed_data = [
            x for x in self.data
            if threshold is None or abs(x) <= threshold
        ]
        self._processed = True
        return processed_data

def main():
    # Example usage
    data = [1.5, -2.0, 3.7, -4.2, 5.0]
    processor = DataProcessor(data)
    
    try:
        stats = processor.calculate_statistics()
        print(f"Statistics: {stats}")
        
        filtered_data = processor.process_data(threshold=4.0)
        print(f"Filtered data: {filtered_data}")
    except ValueError as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
